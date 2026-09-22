import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Blur-rise entrance, fired once when the element scrolls into view.
 * `stagger` > 0 animates the direct children one after another.
 */
export default function Reveal({ as: Tag = 'div', stagger = 0, delay = 0, y = 28, at = 85, className = '', children, ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const targets = stagger ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y, filter: 'blur(10px)' },
        {
          autoAlpha: 1, y: 0, filter: 'blur(0px)',
          duration: 1.05, ease: 'power3.out', delay, stagger,
          scrollTrigger: { trigger: el, start: `top ${at}%`, once: true },
        },
      );
    });
    return () => ctx.revert();
  }, [stagger, delay, y, at]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
