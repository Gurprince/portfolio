import useLenis from './hooks/useLenis';
import Cursor from './components/Cursor';
import Grain from './components/Grain';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Numbers from './components/Numbers';
import Marquee from './components/Marquee';
import Reveal from './components/Reveal';
import Work from './components/Work';
import Experience from './components/Experience';
import { Skills, Credentials } from './components/Skills';
import Contact from './components/Contact';
import { EmailProvider } from './components/EmailDialog';

export default function App() {
  useLenis();

  return (
    <EmailProvider>
      <Cursor />
      <Grain />
      <Nav />
      <main>
        <Hero />
        <Numbers />
        <Marquee />
        <section className="about">
          <Reveal as="p" className="about__text">
            I work across the whole stack: the calculation logic nobody sees, the interface everybody does, and the cloud
            flows that move files around while people sleep. Clients notice when a report that took a day now takes
            seconds, so that's the kind of problem I go looking for.
          </Reveal>
        </section>
        <Work />
        <Experience />
        <Skills />
        <Credentials />
      </main>
      <Contact />
    </EmailProvider>
  );
}
