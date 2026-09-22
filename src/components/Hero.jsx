import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import useMagnetic from '../hooks/useMagnetic';
import useEmailDialog from '../hooks/useEmailDialog';
import { contact } from '../data/resume';

/* the profile card, as tokens so each piece gets its own syntax colour */
const CODE = [
  [['kw', 'const '], ['id', 'gurprince'], ['p', ' = {']],
  [['p', '  '], ['key', 'role'], ['p', ': '], ['str', "'Full Stack Developer'"], ['p', ',']],
  [['p', '  '], ['key', 'at'], ['p', ': '], ['str', "'CFZ Technologies'"], ['p', ',']],
  [['p', '  '], ['key', 'based'], ['p', ': '], ['str', "'Mohali, Punjab'"], ['p', ',']],
  [['p', '  '], ['key', 'stack'], ['p', ': ['], ['str', "'React'"], ['p', ', '], ['str', "'NestJS'"], ['p', ', '], ['str', "'Azure'"], ['p', '],']],
  [['p', '  '], ['key', 'shippedFor'], ['p', ': '], ['num', '4'], ['p', ', '], ['cm', '// companies since 2024']],
  [['p', '};']],
];

const Chars = ({ word }) =>
  [...word].map((c, i) => (
    <span className="hero__char" key={`${c}-${i}`}>{c}</span>
  ));

export default function Hero() {
  const root = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useMagnetic(0.25);
  const cvRef = useMagnetic(0.25);
  const openEmail = useEmailDialog();

  /* scale the one-line name to fill the row on wide screens */
  useLayoutEffect(() => {
    const el = nameRef.current;
    const fit = () => {
      el.style.fontSize = '';
      if (window.innerWidth <= 720) return;
      const host = el.parentElement;
      const pad = parseFloat(getComputedStyle(host).paddingLeft) + parseFloat(getComputedStyle(host).paddingRight);
      const avail = host.clientWidth - pad;
      const size = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${Math.floor(size * (avail / el.getBoundingClientRect().width) * 0.995)}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  /* intro: veil lifts, letters blur-rise, then the profile types itself out */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.1 })
        .to('.veil', { autoAlpha: 0, duration: 0.9, ease: 'power2.out' })
        .fromTo('.hero__char',
          { autoAlpha: 0, yPercent: 40, filter: 'blur(14px)' },
          { autoAlpha: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', stagger: 0.045 }, 0.3)
        .fromTo(['.hero__foot', document.querySelector('.nav')], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '-=0.6')
        .fromTo('.code__ch', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, stagger: 0.018, ease: 'none' }, '-=0.3');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="veil" aria-hidden="true" />

      <h1 className="hero__name" ref={nameRef} aria-label="Gurprince Singh">
        <span className="hero__word" aria-hidden="true"><Chars word="Gurprince" /></span>
        <span className="hero__word hero__word--accent" aria-hidden="true"><Chars word="Singh" /></span>
      </h1>

      <div className="hero__foot">
        <div>
          <p className="hero__lede">
            Full stack developer in Mohali, Punjab. I build web apps, Azure automations and AI features that clients run every day.
          </p>
          <div className="hero__ctas">
            <a ref={emailRef} className="btn btn--solid" href={`mailto:${contact.email}`} onClick={openEmail}>Email me</a>
            <a ref={cvRef} className="btn btn--ghost" href={contact.resume} download>Download résumé</a>
          </div>
        </div>

        <figure className="code" aria-label="Full Stack Developer at CFZ Technologies in Mohali, Punjab, working with React, NestJS and Azure">
          <figcaption className="code__tab">gurprince.js</figcaption>
          <pre className="code__body" aria-hidden="true">
            {CODE.map((line, li) => (
              <span className="code__line" key={li}>
                <span className="code__num">{li + 1}</span>
                {line.map(([kind, text], ti) => (
                  <span className={`tok tok--${kind}`} key={ti}>
                    {[...text].map((c, ci) => <span className="code__ch" key={ci}>{c}</span>)}
                  </span>
                ))}
                {li === CODE.length - 1 && <span className="code__caret" />}
              </span>
            ))}
          </pre>
        </figure>
      </div>
    </section>
  );
}
