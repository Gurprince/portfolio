import Reveal from './Reveal';
import { skills, education, recognition } from '../data/resume';

export function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="section-head">
        <Reveal as="h2" className="section-title">What I work with</Reveal>
      </div>
      <Reveal as="dl" className="skills__grid" stagger={0.07}>
        {skills.map((s) => (
          <div className="skills__group" key={s.group}>
            <dt>{s.group}</dt>
            <dd>{s.items}</dd>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

export function Credentials() {
  return (
    <section className="creds">
      <div>
        <Reveal as="h2" className="creds__title">Education</Reveal>
        <Reveal stagger={0.08}>
          {education.map((e) => (
            <div className="creds__item" key={e.title}>
              <h3>{e.title}</h3>
              <p>{e.where}</p>
              <p className="creds__note">{e.note}</p>
            </div>
          ))}
        </Reveal>
      </div>
      <div>
        <Reveal as="h2" className="creds__title">Recognition</Reveal>
        <Reveal as="ul" className="creds__list" stagger={0.08}>
          {recognition.map((r) => <li key={r}>{r}</li>)}
        </Reveal>
      </div>
    </section>
  );
}
