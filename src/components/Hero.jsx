import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import useMagnetic from '../hooks/useMagnetic';
import useEmailDialog from '../hooks/useEmailDialog';
import ResultsReel from './ResultsReel';
import { contact } from '../data/resume';

let introPlayed = false;

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

  /* intro: letters blur-rise as the CSS loader (index.html) lifts, then the rest settles in */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const first = !introPlayed;
    introPlayed = true;
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: first ? 1.45 : 0.5 })
        .fromTo('.hero__char',
          { autoAlpha: 0, yPercent: 50, filter: 'blur(12px)' },
          { autoAlpha: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', stagger: 0.035 })
        .fromTo(['.hero__meta', '.hero__foot', document.querySelector('.nav')],
          { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '-=0.7');
    }, root);
    return () => ctx.revert();
  }, []);

  /* scroll: letters drift up at uneven speeds as the hero leaves */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.fromTo('.hero__char', { y: 0 }, { y: (i) => -(30 + ((i * 47) % 140)), ease: 'none', scrollTrigger: st });
      gsap.to('.hero__glow', { autoAlpha: 0, ease: 'none', scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  /* amber light that trails the pointer across the hero */
  useLayoutEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const el = root.current;
    const p = { x: el.clientWidth * 0.7, y: el.clientHeight * 0.35 };
    const paint = () => { el.style.setProperty('--mx', `${p.x}px`); el.style.setProperty('--my', `${p.y}px`); };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(p, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 1.2, ease: 'power3.out', overwrite: true, onUpdate: paint });
    };
    paint();
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__meta">
        <p className="hero__status"><span className="hero__pulse" />Currently at CFZ Technologies</p>
        <p className="hero__role">Web apps, Azure automations <em>&amp;</em> AI features</p>
      </div>

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

        <ResultsReel />
      </div>
    </section>
  );
}
