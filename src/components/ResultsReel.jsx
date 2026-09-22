import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import usePageTransition from '../hooks/usePageTransition';
import { results } from '../data/resume';

const HOLD = 4.5; // seconds each result stays up

/**
 * Hero card that cycles through headline results. Each segment of the
 * progress bar fills while its result is showing; hover pauses it, and
 * the segments double as buttons.
 */
export default function ResultsReel() {
  const [idx, setIdx] = useState(0);
  const card = useRef(null);
  const fills = useRef([]);
  const tween = useRef(null);
  const paused = useRef(false);
  const go = usePageTransition();
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    fills.current.forEach((f, i) => gsap.set(f, { scaleX: i < idx ? 1 : 0 }));
    if (reduce) {
      gsap.set(fills.current[idx], { scaleX: 1 });
      return undefined;
    }
    tween.current = gsap.to(fills.current[idx], {
      scaleX: 1,
      duration: HOLD,
      ease: 'none',
      delay: idx === 0 ? 3.2 : 0, // let the intro finish first
      onComplete: () => setIdx((i) => (i + 1) % results.length),
    });
    if (paused.current) tween.current.pause();
    return () => tween.current?.kill();
  }, [idx, reduce]);

  const hold = (on) => {
    paused.current = on;
    if (on) tween.current?.pause();
    else tween.current?.resume();
  };

  const r = results[idx];

  return (
    <figure
      className="reel"
      ref={card}
      onMouseEnter={() => hold(true)}
      onMouseLeave={() => hold(false)}
      onFocus={() => hold(true)}
      onBlur={() => hold(false)}
    >
      <div className="reel__bar">
        {results.map((res, i) => (
          <button
            key={res.slug}
            type="button"
            className="reel__seg"
            aria-label={`Show result ${i + 1} of ${results.length}: ${res.label}`}
            aria-current={i === idx}
            onClick={() => setIdx(i)}
          >
            <span ref={(el) => { fills.current[i] = el; }} />
          </button>
        ))}
      </div>

      <div className="reel__body" key={idx} aria-live="polite">
        <p className="reel__metric">{r.metric}</p>
        <figcaption className="reel__label">{r.label}</figcaption>
      </div>

      <a
        className="reel__link"
        href={`/work/${r.slug}`}
        onClick={(e) => { e.preventDefault(); go(`/work/${r.slug}`); }}
      >
        Read the case study
      </a>
    </figure>
  );
}
