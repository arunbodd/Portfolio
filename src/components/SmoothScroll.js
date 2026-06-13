import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Shared Lenis instance so route changes can scroll to top instantly.
let lenisInstance = null;
export const getLenis = () => lenisInstance;

// Smooth-scroll to an in-page section by id ('top' scrolls to the very top).
// Accounts for the fixed navbar height and falls back gracefully when Lenis
// (reduced-motion / unsupported) isn't active.
export const scrollToSection = (id) => {
  const lenis = getLenis();
  if (id === 'top') {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.2 });
  else {
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const STORE_KEY = (path) => `scroll:${path}`;

const SmoothScroll = ({ children }) => {
  const location = useLocation();
  const isFirstLoad = useRef(true);

  // Persist the scroll position per route so a refresh can restore it. We own
  // restoration (manual) so the browser doesn't fight us.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const save = () => {
      try {
        sessionStorage.setItem(STORE_KEY(location.pathname), String(Math.round(window.scrollY)));
      } catch {
        /* ignore */
      }
    };
    window.addEventListener('pagehide', save);
    window.addEventListener('beforeunload', save);
    document.addEventListener('visibilitychange', save);
    return () => {
      window.removeEventListener('pagehide', save);
      window.removeEventListener('beforeunload', save);
      document.removeEventListener('visibilitychange', save);
    };
  }, [location.pathname]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    // lerp-based smoothing feels far more responsive (lower perceived latency)
    // than a long fixed duration, while still smoothing out wheel steps.
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // On a real route change, start the new page at the top. On the very first
  // load (i.e. a refresh), restore the previous scroll position instead of
  // yanking the user back to the top.
  useEffect(() => {
    const goTo = (y, immediate = true) => {
      if (lenisInstance) lenisInstance.scrollTo(y, { immediate });
      else window.scrollTo(0, y);
    };

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      let saved = 0;
      try {
        saved = Number(sessionStorage.getItem(STORE_KEY(location.pathname)) || 0);
      } catch {
        saved = 0;
      }
      if (saved > 0) {
        // Restore once the layout (and Lenis) is ready; retry as fonts/images settle.
        requestAnimationFrame(() => goTo(saved));
        const t1 = setTimeout(() => goTo(saved), 90);
        const t2 = setTimeout(() => { goTo(saved); ScrollTrigger.refresh(); }, 320);
        return () => { clearTimeout(t1); clearTimeout(t2); };
      }
      const id = setTimeout(() => ScrollTrigger.refresh(), 140);
      return () => clearTimeout(id);
    }

    goTo(0);
    const id = setTimeout(() => ScrollTrigger.refresh(), 140);
    return () => clearTimeout(id);
  }, [location.pathname]);

  return children;
};

export default SmoothScroll;
