import Reveal from './Reveal';
import usePageTransition from '../hooks/usePageTransition';
import { cases } from '../data/resume';

/* Home: one calm card per case study; the full story lives on its own page */
export default function ClientWork() {
  const go = usePageTransition();

  return (
    <section className="cw" id="cases">
      <div className="section-head">
        <Reveal as="h2" className="section-title">Client work</Reveal>
        <Reveal as="p" className="section-sub" delay={0.1}>Three things I built at Penthara Technologies. Open one for the full story.</Reveal>
      </div>

      <Reveal as="ul" className="cw__grid" stagger={0.12}>
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
