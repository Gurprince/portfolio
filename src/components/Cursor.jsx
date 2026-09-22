import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Trailing dot (difference-blended). Grows into a labelled disc over
 * anything with a `data-cursor` attribute. Mouse only.
 */
export default function Cursor() {
  const ref = useRef(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const dot = ref.current;
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.5, ease: 'power4.out' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.5, ease: 'power4.out' });

    const onMove = (e) => {
      dot.classList.add('is-visible');
      xTo(e.clientX);
      yTo(e.clientY);
      const host = e.target.closest?.('[data-cursor]');
      setLabel(host ? host.dataset.cursor : '');
    };
    const onLeave = () => dot.classList.remove('is-visible');

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`cursor${label ? ' is-big' : ''}`} aria-hidden="true">
      <span className="cursor__label">{label}</span>
    </div>
  );
}
