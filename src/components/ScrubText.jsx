import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export default function ScrubText({ children, className = '' }) {
  const ref = useRef(null);
  const words = String(children).trim().split(/\s+/);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo('.scrub__word', { opacity: 0.16 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 55%', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span className="scrub__word" key={i}>{w}{' '}</span>
      ))}
    </p>
  );
}
