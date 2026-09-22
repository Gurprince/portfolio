import { useEffect } from 'react';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import Experience from '../components/Experience';
import { Skills, Credentials } from '../components/Skills';

export default function About() {
  useEffect(() => {
    document.title = 'About · Gurprince Singh';
  }, []);

  return (
    <>
      <header className="page-head">
        <Reveal as="h1" className="page-head__title">About</Reveal>
        <Reveal as="p" className="page-head__text" delay={0.12}>
          I work across the whole stack: the calculation logic nobody sees, the interface everybody does, and the cloud
          flows that move files around while people sleep. Clients notice when a report that took a day now takes
          seconds, so that's the kind of problem I go looking for.
        </Reveal>
      </header>
      <Marquee />
      <Experience />
      <Skills />
      <Credentials />
    </>
  );
}
