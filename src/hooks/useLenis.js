import { useLayoutEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let instance = null;

/** Scroll smoothly to an element, selector or offset; falls back to native. */
export function scrollToTarget(target, { immediate = false } = {}) {
  if (instance) {
    instance.scrollTo(target, immediate ? { immediate: true, force: true } : { duration: 1.4 });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el?.scrollIntoView) el.scrollIntoView({ behavior: 'smooth' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Jumps straight to the top of the page (used on route change). */
export function scrollToTop() {
  instance?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

/** Pauses smooth scrolling while a modal is open. */
export function setScrollLocked(locked) {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}

/** Boots Lenis and keeps it in step with GSAP's ticker and ScrollTrigger. */
export default function useLenis() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({ lerp: 0.1 });
    instance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      if (instance === lenis) instance = null;
    };
  }, []);
}
