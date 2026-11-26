import { createContext, useContext } from 'react';
import { caseBySlug } from '../data/resume';

export const TransitionContext = createContext(() => {});

/** Returns go(path, { scrollTo }) — navigates behind the page-transition cover. */
export default function usePageTransition() {
  return useContext(TransitionContext);
}

/** The word shown on the transition cover for a given path. */
export function labelFor(pathname) {
  if (pathname === '/') return 'Home';
  const pages = { '/about': 'About', '/work': 'Work', '/case-studies': 'Case studies', '/contact': 'Contact' };
  if (pages[pathname]) return pages[pathname];
  const slug = pathname.match(/^\/work\/([^/]+)/)?.[1];
  return caseBySlug(slug)?.client ?? '';
}
