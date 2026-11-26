import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Shared page opener (Work, Case studies, Contact): kicker, a two-line title
 * that rises out of a mask, and an optional lede. `lines` is an array of
 * nodes, one per title line. Children render under the lede.
 */
export default function PageHeader({ index, label, lines, title, lede, children }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.25 })
        .fromTo('.ab__title > span', { yPercent: 105 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 })
        .fromTo('.ph__rest', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.6');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <header className="ab ph" ref={root}>
      <div className="ab__glow" aria-hidden="true" />
      <p className="ab__kicker"><span>({index})</span> {label}</p>
      <h1 className="ab__title" aria-label={title}>
        {lines.map((line, i) => <span key={i} aria-hidden="true">{line}</span>)}
      </h1>
      <div className="ph__rest">
        {lede && <p className="ph__lede">{lede}</p>}
        {children}
      </div>
    </header>
  );
}
