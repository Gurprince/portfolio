import { useCallback, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TransitionContext, labelFor } from '../hooks/usePageTransition';
import { scrollToTarget, scrollToTop } from '../hooks/useLenis';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Route changes happen behind a cover: it wipes up over the page (showing
 * where you're going), the new page mounts underneath, then the cover
 * slides away. Back/forward navigation gets the reveal half.
 */
export default function PageTransition({ children }) {
  const cover = useRef(null);
  const label = useRef(null);
  const busy = useRef(false);
  const first = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();

  const go = useCallback((to, { scrollTo } = {}) => {
    const path = to.split('#')[0] || '/';
    if (path === location.pathname) {
      scrollToTarget(scrollTo ?? 0);
      return;
    }
    if (busy.current) return;
    if (reduced()) {
      navigate(path, { state: { scrollTo } });
      return;
    }
    busy.current = true;
    label.current.textContent = labelFor(path);
    gsap.fromTo(cover.current,
      { yPercent: 100, autoAlpha: 1 },
      { yPercent: 0, duration: 0.6, ease: 'expo.inOut', onComplete: () => navigate(path, { state: { scrollTo } }) });
  }, [location.pathname, navigate]);

  /* new page is in: jump scroll, then lift the cover */
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const target = location.state?.scrollTo;
    scrollToTop();

    const settle = () => {
      ScrollTrigger.refresh();
      if (target) scrollToTarget(target, { immediate: true });
    };

    if (reduced()) {
      settle();
      busy.current = false;
      return;
    }
    // back/forward arrive without the wipe-in, so start covered
    label.current.textContent = labelFor(location.pathname);
    gsap.set(cover.current, { autoAlpha: 1, yPercent: 0 });
    requestAnimationFrame(settle);
    gsap.to(cover.current, {
      yPercent: -100,
      duration: 0.8,
      delay: 0.2,
      ease: 'expo.inOut',
      onComplete: () => {
        gsap.set(cover.current, { autoAlpha: 0 });
        busy.current = false;
      },
    });
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div className="cover" ref={cover} aria-hidden="true">
        <span className="cover__label" ref={label} />
      </div>
    </TransitionContext.Provider>
  );
}
