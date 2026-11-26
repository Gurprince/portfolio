import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Marquee from '../components/Marquee';
import NextPage from '../components/NextPage';
import Experience from '../components/Experience';
import { Skills, Credentials } from '../components/Skills';
import useClock from '../hooks/useClock';
import useEmailDialog from '../hooks/useEmailDialog';
import { contact, roles, education } from '../data/resume';

const lede = `I work across the whole stack: the calculation logic nobody sees, the interface everybody does, and the
cloud flows that move files around while people sleep. Clients notice when a report that took a day now takes
seconds, so that's the kind of problem I go looking for.`;

export default function About() {
  const root = useRef(null);
  const time = useClock();
  const openEmail = useEmailDialog();
  const [degree] = education;

  useEffect(() => {
    document.title = 'About · Gurprince Singh';
  }, []);

  /* title rises, the statement fades in word by word, the fact sheet ticks in row by row */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.25 })
        .fromTo('.ab__title > span', { yPercent: 105 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 })
        .fromTo('.ab__word', { autoAlpha: 0, y: 14, filter: 'blur(6px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', stagger: 0.012 }, '-=0.7')
        .fromTo('.ab__facts > div', { autoAlpha: 0, x: 24 },
          { autoAlpha: 1, x: 0, duration: 0.7, ease: 'expo.out', stagger: 0.07 }, '<0.2');
    }, root);
    return () => ctx.revert();
  }, []);

  const facts = [
    ['Now', `${roles[0].title}, ${roles[0].org.split(',')[0]}`],
    ['Before', roles.slice(1).map((r) => r.org.split(',')[0]).filter((o, i, a) => a.indexOf(o) === i).join(', ')],
    ['Focus', 'Web apps, Azure automations, AI features'],
    ['Studied', `${degree.title.split(',')[0]} CSE, ${degree.where.split(',')[0]}`],
    ['Local time', `Mohali, ${time} IST`],
  ];

  return (
    <>
      <header className="ab" ref={root}>
        <div className="ab__glow" aria-hidden="true" />
        <div className="ab__badge" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <defs><path id="ab-ring" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" /></defs>
            <text><textPath href="#ab-ring" textLength="248" lengthAdjust="spacing">Full stack developer · Mohali · Punjab · </textPath></text>
          </svg>
          <span className="ab__badge-core">gs</span>
        </div>
        <p className="ab__kicker"><span>(01)</span> About</p>
        <h1 className="ab__title" aria-label="About me">
          <span aria-hidden="true">Gurprince,</span>
          <span aria-hidden="true">in <em>short</em></span>
        </h1>

        <div className="ab__grid">
          <p className="ab__lede">
            {lede.split(/\s+/).map((w, i) => <span className="ab__word" key={i}>{w} </span>)}
          </p>

          <div className="ab__side">
            <dl className="ab__facts">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="ab__ctas">
              <a className="btn btn--solid" href={`mailto:${contact.email}`} onClick={openEmail}>Email me</a>
              <a className="btn btn--ghost" href={contact.resume} download>Download résumé</a>
            </div>
          </div>
        </div>
      </header>
      <Marquee />
      <Experience />
      <Skills />
      <Credentials />
      <div className="page-end">
        <NextPage to="/contact" label="Up next · Say hello" title={<>Get in <em>touch</em></>} sub="Email, phone, LinkedIn and GitHub" ghost="Hello" />
      </div>
    </>
  );
}
