import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import NextPage from '../components/NextPage';
import usePageTransition from '../hooks/usePageTransition';
import { cases, roles } from '../data/resume';

const pad = (n) => String(n).padStart(2, '0');

export default function CaseStudies() {
  const go = usePageTransition();
  const penthara = roles.find((r) => r.cases);

  useEffect(() => {
    document.title = 'Case studies · Gurprince Singh';
  }, []);

  return (
    <>
      <PageHeader
        index="03"
        label="Case studies"
        title="Client case studies"
        lines={['Client', <em key="c">case studies</em>]}
        lede="Three things I built at Penthara Technologies: the problem, what I built, and what changed for the client."
      >
        <dl className="ph__stats">
          {cases.map((c) => <div key={c.slug}><dt>{c.metric}</dt><dd>{c.metricLabel}</dd></div>)}
        </dl>
      </PageHeader>

      <section className="clist" aria-label="Case studies">
        {cases.map((c, i) => (
          <Reveal key={c.slug}>
            <a
              className="clist__row"
              href={`/work/${c.slug}`}
              data-cursor="Read"
              onClick={(e) => { e.preventDefault(); go(`/work/${c.slug}`); }}
            >
              <span className="clist__num">{pad(i + 1)}</span>
              <span className="clist__main">
                <span className="clist__client">{c.client}<span>, {c.via}</span></span>
                <span className="clist__title">{c.title}</span>
                <span className="clist__problem">{c.problem}</span>
                <span className="clist__stack">{c.stack.join(' · ')}</span>
              </span>
              <span className="clist__metric">
                <b>{c.metric}</b>
                <span>{c.metricLabel}</span>
                <span className="clist__go">Read the case study</span>
              </span>
            </a>
          </Reveal>
        ))}
      </section>

      {penthara && (
        <section className="shipped">
          <div className="shipped__head">
            <Reveal as="h2" className="section-title">Everything I <em>shipped</em> there</Reveal>
            <Reveal as="p" className="section-sub" delay={0.1}>{penthara.title}, {penthara.org} · {penthara.when}</Reveal>
          </div>
          <Reveal as="ol" className="shipped__list" stagger={0.06}>
            {penthara.points.map((pt, i) => (
              <li key={pt}><span>{pad(i + 1)}</span>{pt}</li>
            ))}
          </Reveal>
        </section>
      )}

      <div className="page-end">
        <NextPage to="/about" label="Up next · The person behind it" title={<>About <em>me</em></>} sub="Experience, tools and education" ghost="About" />
      </div>
    </>
  );
}
