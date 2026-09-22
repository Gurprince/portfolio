import { Route, Routes } from 'react-router-dom';
import useLenis from './hooks/useLenis';
import Cursor from './components/Cursor';
import Grain from './components/Grain';
import Nav from './components/Nav';
import Contact from './components/Contact';
import { EmailProvider } from './components/EmailDialog';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';

export default function App() {
  useLenis();

  return (
    <PageTransition>
      <EmailProvider>
        <Cursor />
        <Grain />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Contact />
      </EmailProvider>
    </PageTransition>
  );
}
