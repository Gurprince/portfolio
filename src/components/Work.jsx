import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Reveal from './Reveal';
import ProjectArt from './ProjectArt';
import { projects, freelance } from '../data/resume';

export default function Work() {
  const root = useRef(null);
  const preview = useRef(null);
  const stack = useRef(null);
  const progress = useRef(null);
  const [current, setCurrent] = useState(1);

  /* mobile carousel: progress bar, counter, and the centred card sits slightly larger */
  const onStackScroll = () => {
    const el = stack.current;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    progress.current.style.transform = `scaleX(${Math.max(el.scrollLeft / max, 0.02)})`;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    [...el.children].forEach((card, i) => {
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid) / card.offsetWidth;
      card.style.setProperty('--focus', (1 - Math.min(d, 1) * 0.07).toFixed(3));
      if (d < best) { best = d; nearest = i; }
    });
    setCurrent(nearest + 1);
  };

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const mm = gsap.matchMedia(root);

    /* each card shrinks and dims as the next one slides over it */
    mm.add('(min-width: 861px)', () => {
      const cards = gsap.utils.toArray('.card');
      cards.slice(0, -1).forEach((card, i) => {
        gsap.to(card, {
          scale: 0.92, '--dim-card': 0.55, ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 150px', scrub: true },
        });
      });
    });

    /* screenshots drift inside their frame while the card scrolls */
    mm.add('(min-width: 0px)', () => {
      gsap.utils.toArray('.card__shot img').forEach((img) => {
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: img.closest('.card'), start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  /* floating screenshot that trails the cursor over freelance rows */
  useLayoutEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const el = preview.current;
    const img = el.querySelector('img');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const rows = root.current.querySelectorAll('.freelance__row[data-image]');

    const onMove = (e) => { xTo(e.clientX); yTo(e.clientY); };
    const onEnter = (e) => {
      img.src = e.currentTarget.dataset.image;
      gsap.to(el, { autoAlpha: 1, scale: 1, rotate: -4, duration: 0.5, ease: 'expo.out', overwrite: 'auto' });
    };
    const onLeave = () => gsap.to(el, { autoAlpha: 0, scale: 0.6, rotate: 0, duration: 0.35, ease: 'power3.in', overwrite: 'auto' });

    gsap.set(el, { autoAlpha: 0, scale: 0.6, xPercent: -50, yPercent: -50 });
    window.addEventListener('mousemove', onMove);
    rows.forEach((r) => { r.addEventListener('mouseenter', onEnter); r.addEventListener('mouseleave', onLeave); });
    return () => {
      window.removeEventListener('mousemove', onMove);
      rows.forEach((r) => { r.removeEventListener('mouseenter', onEnter); r.removeEventListener('mouseleave', onLeave); });
    };
  }, []);

  return (
    <section className="work" id="work" ref={root}>
      <div className="section-head">
        <Reveal as="h2" className="section-title">Selected work</Reveal>
        <Reveal as="p" className="section-sub" delay={0.1}>Products, a patent, and sites clients use to find customers.</Reveal>
      </div>

      <div className="stack" ref={stack} onScroll={onStackScroll}>
        {projects.map((p) => (
          <article className={`card card--${p.tone}`} key={p.name}>
            <div className="card__body">
              <p className="card__kind">{p.kind}</p>
              <h3 className="card__title">{p.name}</h3>
              <p className="card__desc">{p.desc}</p>
              <ul className="chips">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            {p.image ? (
              <div className="card__shot" style={p.ratio ? { aspectRatio: p.ratio } : undefined}>
                <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
              </div>
            ) : (
              <div className="card__art" aria-hidden="true"><ProjectArt /></div>
            )}
          </article>
        ))}
      </div>
      <div className="stack__meta" aria-hidden="true">
        <span className="stack__count">{current} / {projects.length}</span>
        <span className="stack__bar"><span ref={progress} /></span>
        <span className="stack__hint">Swipe</span>
      </div>

      <div className="freelance">
        <Reveal as="h3" className="freelance__title">Freelance, live now</Reveal>
        <Reveal stagger={0.1}>
          {freelance.map((f) => (
            <a
              className="freelance__row"
              key={f.url}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Visit"
              data-image={f.image}
            >
              <span className="freelance__name">{f.name}</span>
              <span className="freelance__what">{f.what}</span>
              <span className="freelance__url">{f.label}</span>
            </a>
          ))}
        </Reveal>
      </div>

      <div className="preview" ref={preview} aria-hidden="true"><img alt="" /></div>
    </section>
  );
}
