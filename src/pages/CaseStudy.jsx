import { useEffect, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import Reveal from '../components/Reveal';
import { BarsDiagram, FlowDiagram, SystemDiagram } from '../components/CaseDiagrams';
import usePageTransition from '../hooks/usePageTransition';
import { cases, caseBySlug, logoFor } from '../data/resume';
import NotFound from './NotFound';

const DIAGRAMS = { bars: BarsDiagram, flow: FlowDiagram, system: SystemDiagram };

export default function CaseStudy() {
  const { slug } = useParams();
  const c = caseBySlug(slug);
  const go = usePageTransition();
  const root = useRef(null);

  useEffect(() => {
    if (c) document.title = `${c.client}: ${c.title} · Gurprince Singh`;
  }, [c]);

  /* header rises in, then the diagram builds itself once it scrolls into view */
  useLayoutEffect(() => {
    if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.2 })
        .fromTo('.study__title-line > span', { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07 })
        .fromTo(['.study__metric', '.study__facts > div'], { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, '-=0.7');

      const trigger = { trigger: '.study__visual', start: 'top 80%', once: true };

      if (document.querySelector('.bars__fill--before')) {
        gsap.timeline({ scrollTrigger: trigger })
          .fromTo('.bars__fill--before', { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'power3.inOut' })
          .fromTo('.bars__fill--after', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, repeat: 4, yoyo: true }, '-=0.1')
          .fromTo('.bars__value, .bars__note', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12 }, '<');
      }

      const lines = gsap.utils.toArray('.dg__line');
      if (lines.length) {
        lines.forEach((l) => {
          const len = l.getTotalLength();
          gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.timeline({ scrollTrigger: trigger })
          .fromTo('.dg__node', { autoAlpha: 0, scale: 0.9, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.6)' })
          .to(lines, { strokeDashoffset: 0, duration: 1.1, stagger: 0.1, ease: 'power2.inOut' }, '-=0.2');
      }
    }, root);
    return () => ctx.revert();
  }, [c]);

  if (!c) return <NotFound />;

  const Diagram = DIAGRAMS[c.diagram];
  const index = cases.indexOf(c);
  const next = cases[(index + 1) % cases.length];
  const pad = (n) => String(n).padStart(2, '0');
  /* last word of the title gets the serif accent; split into lines of up to 4 words for the mask reveal */
  const words = c.title.split(' ');
  const lines = [];
  for (let i = 0; i < words.length; i += 4) lines.push(words.slice(i, i + 4));
  const spot = (e) => {
    const card = e.target.closest('li');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <article className="study" ref={root}>
      <a className="study__back" href="/#cases" onClick={(e) => { e.preventDefault(); go('/', { scrollTo: '#cases' }); }}>
        All client work
      </a>

      <div className="study__glow" aria-hidden="true" />
      <header className="study__head">
        <p className="study__client">
          <span className="study__case">Case {pad(index + 1)} / {pad(cases.length)}</span>
          {c.client}<span>, {c.via}</span>
        </p>
        <h1 className="study__title" aria-label={c.title}>
          {lines.map((line, li) => (
            <span className="study__title-line" key={li} aria-hidden="true">
              <span>
                {line.map((w, wi) => {
                  const last = li === lines.length - 1 && wi === line.length - 1;
                  return <span key={wi}>{last ? <em>{w}</em> : w}{wi < line.length - 1 ? ' ' : ''}</span>;
                })}
              </span>
            </span>
          ))}
        </h1>

        <div className="study__summary">
          <div className="study__metric">
            <span className="study__metric-value">{c.metric}</span>
            <span className="study__metric-label">{c.metricLabel}</span>
            {c.live && (
              <a className="study__live" href={c.live.url} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
                Visit {c.live.label}
              </a>
            )}
          </div>
          <dl className="study__facts">
            <div><dt>Client</dt><dd>{c.client}</dd></div>
            <div><dt>Built at</dt><dd>{c.via}</dd></div>
            <div><dt>Stack</dt><dd>{c.stack.join(', ')}</dd></div>
          </dl>
        </div>
      </header>

      <figure className="study__figure">
        <figcaption className="study__figcap"><span>Fig. {pad(index + 1)}</span> How it works</figcaption>
        <div className="study__visual"><Diagram /></div>
      </figure>

      <dl className="study__story">
        {[['Problem', c.problem], ['What I built', c.built], ['Result', c.result]].map(([k, v], i) => (
          <Reveal className={`study__row${i === 2 ? ' study__result' : ''}`} key={k}>
            <dt><span>{pad(i + 1)}</span>{k}</dt>
            <dd>{v}</dd>
          </Reveal>
        ))}
      </dl>

      {c.features && (
        <section className="study__features">
          <Reveal as="h2" className="study__features-title">What&apos;s <em>inside</em></Reveal>
          <Reveal as="ul" className="study__features-grid" stagger={0.06} onPointerMove={spot}>
            {c.features.map((f, i) => (
              <li key={f.name}>
                <span className="study__feat-num">{pad(i + 1)}</span>
                <h3>{f.name}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </Reveal>
        </section>
      )}

      <Reveal className="study__stack-wrap">
        <h2 className="study__stack-title">Built with</h2>
        <ul className="study__stack">
          {c.stack.map((s) => (
            <li key={s}><img src={logoFor(s)} alt="" />{s}</li>
          ))}
        </ul>
      </Reveal>

      <a
        className="study__next"
        href={`/work/${next.slug}`}
        onClick={(e) => { e.preventDefault(); go(`/work/${next.slug}`); }}
      >
        <span className="study__next-ghost" aria-hidden="true">{next.metric}</span>
        <span className="study__next-label">Next case study · {pad(cases.indexOf(next) + 1)}</span>
        <span className="study__next-title">{next.title}</span>
        <span className="study__next-client">{next.client}</span>
      </a>
    </article>
  );
}
