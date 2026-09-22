import { useEffect } from 'react';
import usePageTransition from '../hooks/usePageTransition';

export default function NotFound() {
  const go = usePageTransition();

  useEffect(() => {
    document.title = 'Page not found · Gurprince Singh';
  }, []);

  return (
    <section className="lost">
      <h1 className="lost__code">404</h1>
      <p className="lost__text">This page doesn't exist. The link may be old or mistyped.</p>
      <a className="btn btn--solid" href="/" onClick={(e) => { e.preventDefault(); go('/'); }}>Go to the home page</a>
    </section>
  );
}
