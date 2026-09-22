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

  /* intro: veil lifts, letters blur-rise, then the rest of the hero settles in */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    if (introPlayed) {
      gsap.set('.veil', { autoAlpha: 0 });
      const ctx = gsap.context(() => {
        gsap.fromTo('.hero__char',
          { autoAlpha: 0, yPercent: 30, filter: 'blur(10px)' },
          { autoAlpha: 1, yPercent: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out', stagger: 0.03, delay: 0.5 });
      }, root);
      return () => ctx.revert();
    }
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.1, onComplete: () => { introPlayed = true; } })
        .to('.veil', { autoAlpha: 0, duration: 0.9, ease: 'power2.out' })
        .fromTo('.hero__char',
          { autoAlpha: 0, yPercent: 40, filter: 'blur(14px)' },
          { autoAlpha: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', stagger: 0.045 }, 0.3)
        .fromTo(['.hero__foot', document.querySelector('.nav')], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '-=0.6');
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

        <ResultsReel />
      </div>
    </section>
  );
}
