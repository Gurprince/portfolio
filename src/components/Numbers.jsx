import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { numbers } from '../data/resume';

/** Outlined figures that count up once, and fill in solid on hover. */
export default function Numbers() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const els = root.current.querySelectorAll('[data-to]');
    const set = (el, v) => (el.textContent = v.toFixed(Number(el.dataset.decimals)));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => set(el, Number(el.dataset.to)));
      return undefined;
    }
    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const o = { v: 0 };
        gsap.to(o, {
          v: Number(el.dataset.to), duration: 2.2, ease: 'power3.out',
          onUpdate: () => set(el, o.v),
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="numbers" aria-label="Highlights" ref={root}>
      {numbers.map((n) => (
        <div className="numbers__item" key={n.label}>
          <p className="numbers__value">
            <span data-to={n.value} data-decimals={n.decimals ?? 0}>0</span>{n.suffix}
          </p>
          <p className="numbers__label">{n.label}</p>
        </div>
      ))}
    </section>
  );
}
