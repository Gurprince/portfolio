import RollText from './RollText';
import useClock from '../hooks/useClock';
import { scrollToTarget } from '../hooks/useLenis';

const LINKS = [
  ['#work', 'Work'],
  ['#experience', 'Experience'],
  ['#skills', 'Skills'],
  ['#contact', 'Contact'],
];

export default function Nav() {
  const time = useClock();

  const go = (e, href) => {
    e.preventDefault();
    scrollToTarget(href === '#top' ? 0 : href);
  };

  return (
    <header className="nav">
      <a className="nav__mark roll-host" href="#top" aria-label="Back to top" onClick={(e) => go(e, '#top')}>
        <RollText>GS</RollText>
      </a>
      <nav className="nav__links" aria-label="Sections">
        {LINKS.map(([href, label]) => (
          <a key={href} className="roll-host" href={href} onClick={(e) => go(e, href)}>
            <RollText>{label}</RollText>
          </a>
        ))}
      </nav>
      <p className="nav__clock">Mohali <time>{time}</time></p>
    </header>
  );
}
