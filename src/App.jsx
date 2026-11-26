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
import Projects from './pages/Projects';
import CaseStudies from './pages/CaseStudies';
import ContactPage from './pages/ContactPage';
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
        <main id="content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Projects />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Contact />
      </EmailProvider>
    </PageTransition>
  );
}
