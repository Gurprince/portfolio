import usePageTransition from '../hooks/usePageTransition';

/** Full-width "up next" panel that closes a page and leads to the next one (styles shared with case studies). */
export default function NextPage({ to, label, title, sub, ghost }) {
  const go = usePageTransition();
  return (
    <a className="study__next next-page" href={to} onClick={(e) => { e.preventDefault(); go(to); }}>
      {ghost && <span className="study__next-ghost" aria-hidden="true">{ghost}</span>}
      <span className="study__next-label">{label}</span>
      <span className="study__next-title">{title}</span>
      {sub && <span className="study__next-client">{sub}</span>}
    </a>
  );
}
