import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stack } from '../data/resume';

/** Endless stack ticker that speeds up (and reverses) with scroll velocity. */
export default function Marquee() {
  const track = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const loop = gsap.to(track.current, { xPercent: -50, duration: 34, ease: 'none', repeat: -1 });
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const dir = self.direction === -1 ? -1 : 1;
        const boost = Math.min(Math.abs(self.getVelocity()) / 400, 5);
        gsap.to(loop, { timeScale: dir * (1 + boost), duration: 0.3, overwrite: true });
        gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3 });
      },
    });
    return () => { st.kill(); loop.kill(); };
  }, []);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={track}>
        {[...stack, ...stack].map((s, i) => (
          <span className="marquee__item" key={i}>
            {s.logo && <img className="marquee__logo" src={s.logo} alt="" loading="lazy" />}
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
