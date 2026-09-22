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

  /* the diagram builds itself once it scrolls into view */
  useLayoutEffect(() => {
    if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
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
  const next = cases[(cases.indexOf(c) + 1) % cases.length];

  return (
    <article className="study" ref={root}>
      <a className="study__back" href="/#cases" onClick={(e) => { e.preventDefault(); go('/', { scrollTo: '#cases' }); }}>
        All client work
      </a>

      <header className="study__head">
        <Reveal as="p" className="study__client">{c.client}<span>, {c.via}</span></Reveal>
        <Reveal as="h1" className="study__title">{c.title}</Reveal>
        <Reveal className="study__metric" delay={0.15}>
          <span className="study__metric-value">{c.metric}</span>
          <span className="study__metric-label">{c.metricLabel}</span>
        </Reveal>
        {c.live && (
          <a className="study__live" href={c.live.url} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
            Visit {c.live.label}
          </a>
        )}
      </header>

      <div className="study__visual"><Diagram /></div>

      <Reveal as="dl" className="study__story" stagger={0.12}>
        <div><dt>Problem</dt><dd>{c.problem}</dd></div>
        <div><dt>What I built</dt><dd>{c.built}</dd></div>
        <div className="study__result"><dt>Result</dt><dd>{c.result}</dd></div>
      </Reveal>

      {c.features && (
        <section className="study__features">
          <Reveal as="h2" className="study__features-title">What's inside</Reveal>
          <Reveal as="ul" className="study__features-grid" stagger={0.06}>
            {c.features.map((f) => (
              <li key={f.name}>
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
        data-cursor="Next"
        onClick={(e) => { e.preventDefault(); go(`/work/${next.slug}`); }}
      >
        <span className="study__next-label">Next case study</span>
        <span className="study__next-title">{next.title}</span>
        <span className="study__next-client">{next.client}</span>
      </a>
    </article>
  );
}
