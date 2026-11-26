import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import ProjectArt from '../components/ProjectArt';
import Marquee from '../components/Marquee';
import NextPage from '../components/NextPage';
import { projects, freelance } from '../data/resume';

const pad = (n) => String(n).padStart(2, '0');

export default function Projects() {
  const root = useRef(null);

  useEffect(() => {
    document.title = 'Work · Gurprince Singh';
  }, []);

  /* screenshots drift inside their frames as each project passes */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.plist__media img, .flist__shot img').forEach((img) => {
        gsap.fromTo(img, { yPercent: -6 }, {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <PageHeader
        index="02"
        label="Work"
        title="Selected work"
        lines={['Selected', <em key="w">work</em>]}
        lede="Products I built on my own, a granted patent, and sites clients use to find customers."
      >
        <dl className="ph__stats">
          <div><dt>{pad(projects.length)}</dt><dd>products built on my own</dd></div>
          <div><dt>01</dt><dd>granted patent, for an IoT notice board</dd></div>
          <div><dt>{pad(freelance.length)}</dt><dd>client sites live today</dd></div>
        </dl>
      </PageHeader>

      <section className="plist" aria-label="Projects">
        {projects.map((p, i) => (
          <Reveal as="article" className={`plist__item plist__item--${p.tone}`} key={p.name}>
            <div className="plist__media">
              {p.image ? <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" /> : <div className="plist__art"><ProjectArt /></div>}
            </div>
            <div className="plist__body">
              <p className="plist__meta"><span>{pad(i + 1)}</span>{p.kind}</p>
              <h2 className="plist__name">{p.name}</h2>
              <p className="plist__desc">{p.desc}</p>
              <ul className="chips">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              {p.repo && (
                <a className="card__link" href={p.repo} target="_blank" rel="noopener noreferrer" data-cursor="Code">
                  View code on GitHub
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </section>

      <section className="flist">
        <div className="section-head">
          <Reveal as="h2" className="section-title">Live <em>sites</em></Reveal>
          <Reveal as="p" className="section-sub" delay={0.1}>Freelance builds that clients run their business on today.</Reveal>
        </div>
        <Reveal as="ul" className="flist__grid" stagger={0.12}>
          {freelance.map((f) => (
            <li key={f.url}>
              <a className="flist__card" href={f.url} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
                <span className="flist__shot"><img src={f.image} alt={`${f.name} website`} loading="lazy" /></span>
                <span className="flist__name">{f.name}</span>
                <span className="flist__what">{f.what}</span>
                <span className="flist__url">{f.label} ↗</span>
              </a>
            </li>
          ))}
        </Reveal>
      </section>

      <Marquee />

      <div className="page-end">
        <NextPage to="/case-studies" label="Up next · Client work" title={<>Case <em>studies</em></>} sub="Three client problems, solved end to end" ghost="24h → 7s" />
      </div>
    </div>
  );
}
