import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Reveal from './Reveal';
import ProjectArt from './ProjectArt';
import { projects, freelance, contact } from '../data/resume';

export default function Work() {
  const root = useRef(null);
  const preview = useRef(null);
  const stack = useRef(null);
  const progress = useRef(null);
  const pin = useRef(null);
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
    [...el.querySelectorAll('.card')].forEach((card, i) => {
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid) / card.offsetWidth;
      card.style.setProperty('--focus', (1 - Math.min(d, 1) * 0.07).toFixed(3));
      if (d < best) { best = d; nearest = i; }
    });
    setCurrent(nearest + 1);
  };

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const mm = gsap.matchMedia(root);

    /* desktop: the section pins and the cards travel sideways with the scroll */
    mm.add('(min-width: 861px)', () => {
      const track = stack.current;
      const dist = () => track.scrollWidth - track.parentElement.clientWidth;
      const cards = gsap.utils.toArray('.card', track);
      const slide = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: pin.current, pin: true, start: 'center center', end: () => `+=${dist()}`,
          scrub: 1, invalidateOnRefresh: true,
        },
        /* on the tween, not the trigger, so the counter follows the smoothed motion */
        onUpdate() {
            progress.current.style.transform = `scaleX(${Math.max(this.progress(), 0.02)})`;
            const mid = window.innerWidth / 2;
            let nearest = 0;
            let best = Infinity;
            cards.forEach((c, i) => {
              const r = c.getBoundingClientRect();
              const d = Math.abs(r.left + r.width / 2 - mid);
              if (d < best) { best = d; nearest = i; }
            });
            setCurrent(nearest + 1);
        },
      });
      /* outlined ghost words drift the other way, behind the cards */
      gsap.fromTo('.work__ghost', { xPercent: 0 }, {
        xPercent: -35, ease: 'none',
        scrollTrigger: { trigger: pin.current, start: 'center center', end: () => `+=${dist()}`, scrub: 1, invalidateOnRefresh: true },
      });
      /* screenshots pan inside their frame, cards tilt in from the right */
      gsap.utils.toArray('.card__shot img').forEach((img) => {
        gsap.fromTo(img, { xPercent: -5 }, {
          xPercent: 5, ease: 'none',
          scrollTrigger: { trigger: img.closest('.card'), containerAnimation: slide, start: 'left right', end: 'right left', scrub: true },
        });
      });
      /* coverflow: each card swings in from the right, faces you at centre, swings away to the left */
      cards.forEach((card) => {
        gsap.fromTo(card, { rotateY: -28, scale: 0.84, z: -120 }, {
          rotateY: 0, scale: 1, z: 0, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left right', end: 'center center', scrub: true },
        });
        gsap.fromTo(card, { rotateY: 0, scale: 1, z: 0 }, {
          rotateY: 28, scale: 0.84, z: -120, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: card, containerAnimation: slide, start: 'center center', end: 'right left', scrub: true },
        });
      });
    });

    /* phones: screenshots drift inside their frame while the page scrolls */
    mm.add('(max-width: 860px)', () => {
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
        <Reveal as="h2" className="section-title">Own <em>projects</em><sup aria-hidden="true">({String(projects.length).padStart(2, '0')})</sup></Reveal>
        <Reveal as="p" className="section-sub" delay={0.1}>Products I built on my own, a granted patent, and sites clients use to find customers.</Reveal>
      </div>

      <div className="work__pin" ref={pin}>
      <p className="work__ghost" aria-hidden="true">Selected work <em>&amp;</em> side projects · Selected work <em>&amp;</em> side projects</p>
      <div className="stack" ref={stack} onScroll={onStackScroll}>
        <div className="stack__intro">
          <p className="stack__kicker">({String(projects.length).padStart(2, '0')}) Own projects</p>
          <h2 className="stack__headline">Built on <em>my own</em> time</h2>
          <p className="stack__sub">Products, a granted patent, and the ideas I couldn&apos;t leave alone.</p>
          <p className="stack__cue">Scroll to explore</p>
        </div>
        {projects.map((p, i) => (
          <article className={`card card--${p.tone}`} key={p.name}>
            <div className="card__body">
              <p className="card__top">
                <span className="card__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="card__kind">{p.kind}</span>
              </p>
              <h3 className="card__title">{p.name}</h3>
              <p className="card__desc">{p.desc}</p>
              <ul className="chips">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              {p.repo && (
                <a className="card__link" href={p.repo} target="_blank" rel="noopener noreferrer" data-cursor="Code">
                  View code on GitHub
                </a>
              )}
            </div>
            {p.image ? (
              <div className="card__shot" style={p.ratio ? { aspectRatio: p.ratio } : undefined}>
                <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
                {/* pointer-only shortcut to the repo; the text link above stays the accessible one */}
                {p.repo && (
                  <a className="card__shot-link" href={p.repo} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" data-cursor="Open repo" />
                )}
              </div>
            ) : (
              <div className="card__art" aria-hidden="true"><ProjectArt /></div>
            )}
          </article>
        ))}
        <a className="stack__outro" href={contact.github} target="_blank" rel="noopener noreferrer" data-cursor="GitHub">
          <span className="stack__outro-label">More on</span>
          <span className="stack__outro-big">GitHub <em>↗</em></span>
        </a>
      </div>
      <div className="stack__meta" aria-hidden="true">
        <span className="stack__count"><b>{String(current).padStart(2, '0')}</b> / {String(projects.length).padStart(2, '0')}</span>
        <span className="stack__bar"><span ref={progress} /></span>
        <span className="stack__hint"><span className="hint--touch">Swipe</span><span className="hint--desk">Keep scrolling</span></span>
      </div>
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
