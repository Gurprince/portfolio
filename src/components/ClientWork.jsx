import Reveal from './Reveal';
import usePageTransition from '../hooks/usePageTransition';
import { cases } from '../data/resume';

/* Home: one calm card per case study; the full story lives on its own page */
export default function ClientWork({ bare = false }) {
  const go = usePageTransition();

  return (
    <section className={`cw${bare ? ' cw--bare' : ''}`} id="cases" aria-label={bare ? 'Case studies' : undefined}>
      {!bare && <div className="section-head">
        <Reveal as="h2" className="section-title">Client <em>work</em><sup aria-hidden="true">({String(cases.length).padStart(2, '0')})</sup></Reveal>
        <Reveal as="p" className="section-sub" delay={0.1}>Three things I built at Penthara Technologies. Open one for the full story.</Reveal>
      </div>}

      <Reveal
        as="ul"
        className="cw__grid"
        stagger={0.12}
        onPointerMove={(e) => {
          const card = e.target.closest('.cw__card');
          if (!card) return;
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${e.clientX - r.left}px`);
          card.style.setProperty('--my', `${e.clientY - r.top}px`);
        }}
      >
        {cases.map((c) => (
          <li key={c.slug}>
            <a
              className="cw__card"
              href={`/work/${c.slug}`}
              data-cursor="Read"
              onClick={(e) => { e.preventDefault(); go(`/work/${c.slug}`); }}
            >
              <span className="cw__client">{c.client}</span>
              <span className="cw__metric">{c.metric}</span>
              <span className="cw__label">{c.metricLabel}</span>
              <span className="cw__title">{c.title}</span>
              <span className="cw__more">Read the case study</span>
            </a>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
