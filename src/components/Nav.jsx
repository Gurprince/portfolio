import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RollText from './RollText';
import useClock from '../hooks/useClock';
import usePageTransition from '../hooks/usePageTransition';
import { scrollToTarget, setScrollLocked } from '../hooks/useLenis';
import { cases } from '../data/resume';

export default function Nav() {
  const time = useClock();
  const go = usePageTransition();
  const { pathname } = useLocation();
  const menu = useRef(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  /* [label, href, what the click does, is this the current page] — Contact is the footer, on every page */
  const links = [
    ['Work', '/#cases', () => go('/', { scrollTo: '#cases' }), pathname.startsWith('/work')],
    ['About', '/about', () => go('/about'), pathname === '/about'],
    ['Contact', '#contact', () => scrollToTarget('#contact'), false],
  ];

  /* tuck the bar away while scrolling down, bring it back on any scroll up */
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMenu = () => {
    menu.current.showModal();
    setScrollLocked(true);
    setOpen(true);
  };
  // unlock synchronously so a scroll fired right after closing isn't swallowed by stopped Lenis
  const closeMenu = () => {
    if (menu.current.open) menu.current.close();
    setScrollLocked(false);
    setOpen(false);
  };
  const follow = (e, onGo) => {
    e.preventDefault();
    closeMenu();
    onGo();
  };

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <header className={`nav${hidden && !open ? ' is-hidden' : ''}`}>
        <a
          className="nav__mark roll-host"
          href="/"
          aria-label="Gurprince Singh, home"
          aria-current={pathname === '/' ? 'page' : undefined}
          onClick={(e) => follow(e, () => go('/'))}
        >
          <RollText>GS</RollText>
        </a>
        <nav className="nav__links" aria-label="Main">
          {links.map(([label, href, onGo, current]) => (
            <a key={label} className="roll-host" href={href} aria-current={current ? 'page' : undefined} onClick={(e) => follow(e, onGo)}>
              <RollText>{label}</RollText>
            </a>
          ))}
        </nav>
        <p className="nav__clock">Mohali <time>{time}</time></p>
        <button className="nav__toggle" type="button" aria-haspopup="dialog" aria-expanded={open} onClick={openMenu}>
          Menu
        </button>
      </header>

      <dialog className="menu" ref={menu} aria-label="Site menu" onClose={closeMenu} onCancel={closeMenu}>
        <div className="menu__top">
          <span className="nav__mark">GS</span>
          <button className="nav__toggle" type="button" onClick={closeMenu} autoFocus>Close</button>
        </div>
        <nav className="menu__pages" aria-label="Pages">
          {[['Home', '/', () => go('/'), pathname === '/'], ...links].map(([label, href, onGo, current], i) => (
            <a key={label} href={href} style={{ '--i': i }} aria-current={current ? 'page' : undefined} onClick={(e) => follow(e, onGo)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="menu__cases">
          <p className="menu__label">Case studies</p>
          <ul>
            {cases.map((c, i) => {
              const to = `/work/${c.slug}`;
              return (
                <li key={c.slug} style={{ '--i': i + 4 }}>
                  <a href={to} aria-current={pathname === to ? 'page' : undefined} onClick={(e) => follow(e, () => go(to))}>
                    <span>{c.client}</span>{c.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </dialog>
    </>
  );
}
