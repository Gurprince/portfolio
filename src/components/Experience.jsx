import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Reveal from './Reveal';
import { roles, caseBySlug } from '../data/resume';
import usePageTransition from '../hooks/usePageTransition';

function Role({ role, open, onToggle }) {
  const body = useRef(null);
  const go = usePageTransition();
  const first = useRef(true);

  /* animate height between closed and open; skip on first render */
  useLayoutEffect(() => {
    const el = body.current;
    if (first.current) {
      first.current = false;
      gsap.set(el, { height: open ? 'auto' : 0, autoAlpha: open ? 1 : 0 });
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.to(el, {
      height: open ? 'auto' : 0,
      autoAlpha: open ? 1 : 0,
      duration: reduce ? 0 : open ? 0.6 : 0.45,
      ease: open ? 'power3.out' : 'power3.inOut',
    });
    if (open && !reduce) {
      gsap.fromTo(el.children, { y: 14, autoAlpha: 0, filter: 'blur(6px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.05, ease: 'power3.out' });
    }
  }, [open]);

  const id = `role-${role.org.replace(/\W+/g, '-')}`;
  return (
    <div className={`role${open ? ' is-open' : ''}`}>
      <button className="role__head" type="button" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span className="role__when">{role.when}</span>
        <span className="role__title">{role.title}</span>
        <span className="role__org">{role.org}</span>
        <span className="role__toggle" aria-hidden="true" />
      </button>
      <ul className="role__points" id={id} ref={body}>
        {role.points.map((p) => <li key={p}>{p}</li>)}
        {role.cases && (
          <li className="role__cases">
            Case studies:{' '}
            {role.cases.map((slug, i) => (
              <span key={slug}>
                {i > 0 && ', '}
                <a href={`/work/${slug}`} onClick={(e) => { e.preventDefault(); go(`/work/${slug}`); }}>
                  {caseBySlug(slug).client === 'Penthara Technologies' ? 'internal app' : caseBySlug(slug).client}
                </a>
              </span>
            ))}
          </li>
        )}
      </ul>
    </div>
  );
}

export default function Experience() {
  const [openIdx, setOpenIdx] = useState(0);
  const rail = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rail.current.style.transform = 'scaleY(1)';
      return undefined;
    }
    const tween = gsap.to(rail.current, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true },
    });
    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <section className="exp" id="experience">
      <div className="section-head">
        <Reveal as="h2" className="section-title">Experience</Reveal>
        <Reveal as="p" className="section-sub" delay={0.1}>Open a role to see what I shipped there.</Reveal>
      </div>
      <div className="timeline">
        <div className="timeline__rail" aria-hidden="true"><span ref={rail} /></div>
        <Reveal stagger={0.08}>
          {roles.map((r, i) => (
            <Role key={r.org} role={r} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
