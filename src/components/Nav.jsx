import RollText from './RollText';
import useClock from '../hooks/useClock';
import usePageTransition from '../hooks/usePageTransition';
import { scrollToTarget } from '../hooks/useLenis';

export default function Nav() {
  const time = useClock();
  const go = usePageTransition();

  /* [label, href, what the click does] — Contact is the footer, on every page */
  const links = [
    ['Work', '/#cases', () => go('/', { scrollTo: '#cases' })],
    ['About', '/about', () => go('/about')],
    ['Contact', '#contact', () => scrollToTarget('#contact')],
  ];

  return (
    <header className="nav">
      <a className="nav__mark roll-host" href="/" aria-label="Home" onClick={(e) => { e.preventDefault(); go('/'); }}>
        <RollText>GS</RollText>
      </a>
      <nav className="nav__links" aria-label="Main">
        {links.map(([label, href, onGo]) => (
          <a key={label} className="roll-host" href={href} onClick={(e) => { e.preventDefault(); onGo(); }}>
            <RollText>{label}</RollText>
          </a>
        ))}
      </nav>
      <p className="nav__clock">Mohali <time>{time}</time></p>
    </header>
  );
}
