import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Reveal from './Reveal';
import { skills, education, recognition, logoFor } from '../data/resume';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Stack explorer: pick a group, then hover, focus or tap a tile to see
 * where that skill was used in real work.
 */
export function Skills() {
  const [groupIdx, setGroupIdx] = useState(0);
  const [skillIdx, setSkillIdx] = useState(0);
  const tabs = useRef(null);
  const indicator = useRef(null);
  const grid = useRef(null);
  const first = useRef(true);

  const group = skills[groupIdx];
  const active = group.items[skillIdx] ?? group.items[0];

  const selectGroup = (i) => {
    if (i === groupIdx) return;
    setGroupIdx(i);
    setSkillIdx(0);
  };

  /* arrow keys move between tabs, as a tablist should */
  const onTabKey = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (groupIdx + step + skills.length) % skills.length;
    selectGroup(next);
    tabs.current.querySelectorAll('[role="tab"]')[next].focus();
  };

  /* slide the amber indicator under the active tab, and keep it in view on mobile */
  useLayoutEffect(() => {
    const move = () => {
      const tab = tabs.current.querySelectorAll('[role="tab"]')[groupIdx];
      const vertical = window.innerWidth > 860;
      const props = vertical
        ? { x: 0, y: tab.offsetTop, width: 3, height: tab.offsetHeight }
        : { x: tab.offsetLeft, y: tab.offsetTop + tab.offsetHeight - 3, width: tab.offsetWidth, height: 3 };
      gsap.to(indicator.current, { ...props, duration: reduced() ? 0 : 0.5, ease: 'expo.out' });
      if (!vertical) tabs.current.scrollTo({ left: tab.offsetLeft - 16, behavior: reduced() ? 'auto' : 'smooth' });
    };
    move();
    window.addEventListener('resize', move);
    return () => window.removeEventListener('resize', move);
  }, [groupIdx]);

  /* tiles pop in, staggered, every time the group changes */
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    if (reduced()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo('.tile',
        { autoAlpha: 0, y: 18, scale: 0.9, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out', stagger: 0.04 });
    }, grid);
    return () => ctx.revert();
  }, [groupIdx]);

  return (
    <section className="skills" id="skills">
      <div className="section-head">
        <Reveal as="h2" className="section-title">What I work with</Reveal>
        <Reveal as="p" className="section-sub" delay={0.1}>Pick an area, then a tool, to see where I've used it.</Reveal>
      </div>

      <Reveal className="explorer">
        <div className="explorer__tabs" role="tablist" aria-label="Skill areas" ref={tabs} onKeyDown={onTabKey}>
          <span className="explorer__indicator" ref={indicator} aria-hidden="true" />
          {skills.map((g, i) => (
            <button
              key={g.group}
              type="button"
              role="tab"
              id={`tab-${i}`}
              aria-selected={i === groupIdx}
              aria-controls="skills-panel"
              tabIndex={i === groupIdx ? 0 : -1}
              className="explorer__tab"
              onClick={() => selectGroup(i)}
            >
              <span>{g.group}</span>
              <span className="explorer__count">{g.items.length}</span>
            </button>
          ))}
        </div>

        <div className="explorer__panel" role="tabpanel" id="skills-panel" aria-labelledby={`tab-${groupIdx}`}>
          <ul className="explorer__grid" ref={grid}>
            {group.items.map((item, i) => (
              <li key={item.name}>
                <button
                  type="button"
                  className={`tile${i === skillIdx ? ' is-active' : ''}`}
                  aria-pressed={i === skillIdx}
                  onMouseEnter={() => setSkillIdx(i)}
                  onFocus={() => setSkillIdx(i)}
                  onClick={() => setSkillIdx(i)}
                >
                  <span className="tile__logo"><img src={logoFor(item.name)} alt="" /></span>
                  <span className="tile__name">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="explorer__detail" aria-live="polite">
            <span className="explorer__detail-logo" key={`logo-${active.name}`}><img src={logoFor(active.name)} alt="" /></span>
            <div key={active.name} className="explorer__detail-text">
              <h3 className="explorer__detail-name">{active.name}</h3>
              <p className="explorer__detail-used">{active.used}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Credentials() {
  return (
    <>
      <section className="edu">
        <div className="section-head">
          <Reveal as="h2" className="section-title">Education</Reveal>
        </div>
        <Reveal className="edu__grid" stagger={0.12}>
          {education.map((e) => (
            <article className="edu__card" key={e.title}>
              <p className="edu__years" aria-label={`${e.years[0]} to 20${e.years[1]}`}>
                {e.years[0]}<span>–{e.years[1]}</span>
              </p>
              <h3 className="edu__title">{e.title}</h3>
              <p className="edu__where">{e.where}</p>
              <p className="edu__note">{e.note}</p>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="awards">
        <div className="section-head">
          <Reveal as="h2" className="section-title">Recognition</Reveal>
        </div>
        <Reveal as="ul" className="awards__list" stagger={0.1}>
          {recognition.map((r) => (
            <li className="award" key={r.text}>
              <span className="award__figure">{r.figure}</span>
              <span className="award__text">{r.text}</span>
            </li>
          ))}
        </Reveal>
      </section>
    </>
  );
}
