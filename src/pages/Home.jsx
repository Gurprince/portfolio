import { useEffect } from 'react';
import Hero from '../components/Hero';
import Numbers from '../components/Numbers';
import ClientWork from '../components/ClientWork';
import Work from '../components/Work';
import Reveal from '../components/Reveal';
import usePageTransition from '../hooks/usePageTransition';

export default function Home() {
  const go = usePageTransition();

  useEffect(() => {
    document.title = 'Gurprince Singh · Full Stack Developer';
  }, []);

  return (
    <>
      <Hero />
      <Numbers />
      <ClientWork />
      <Work />
      <section className="bridge">
        <Reveal as="p" className="bridge__text">
          Right now I'm a Full Stack Developer at CFZ Technologies in Mohali. Before that, I shipped client work at
          Penthara Technologies, Logicsoft International and Speedum Technology.
        </Reveal>
        <Reveal delay={0.15}>
          <a className="btn btn--ghost" href="/about" onClick={(e) => { e.preventDefault(); go('/about'); }}>
            See my experience and skills
          </a>
        </Reveal>
      </section>
    </>
  );
}
