import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/* far-apart offsets so each jump of the tiled noise reads as fresh grain */
const OFFSETS = [
  [0, 0], [163, -87], [-201, 54], [47, 181], [-118, -152], [216, 23],
  [-64, -203], [139, 97], [-177, -41], [28, -134], [191, 166], [-92, 71],
];

export default function Grain() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const tl = gsap.timeline({ repeat: -1 });
    OFFSETS.forEach(([x, y], i) => tl.set(ref.current, { x, y }, i * 0.09));
    tl.set(ref.current, { x: 0, y: 0 }, OFFSETS.length * 0.09);
    return () => tl.kill();
  }, []);

  return <div ref={ref} className="grain" aria-hidden="true" />;
}
