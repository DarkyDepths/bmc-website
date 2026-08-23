'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

import { whenOpen } from '@/lib/open';

/**
 * Smooth scrolling, but only when the reader has not asked for reduced motion. Lenis is
 * torn down and native scrolling restored the moment that preference flips, so the setting
 * is respected live rather than only on load.
 *
 * It also holds still behind the cover sheet. `overflow: hidden` cannot stop it: Lenis
 * turns a wheel event into a programmatic scroll, and programmatic scrolling is exactly
 * what `overflow: hidden` still allows. So it has to be told, not styled. A fragment in
 * the URL is still honoured, because that scroll is set once and not driven by the wheel.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | null = null;
    let frame = 0;
    let release = () => {};

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.05,
        // Matches --ease-out-expo. Motion in this project never bounces.
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      const held = lenis;
      held.stop();
      release();
      release = whenOpen(() => held.start());

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      release();
      release = () => {};
      lenis?.destroy();
      lenis = null;
    };

    const sync = () => (query.matches ? stop() : start());

    sync();
    query.addEventListener('change', sync);

    return () => {
      query.removeEventListener('change', sync);
      stop();
    };
  }, []);

  return null;
}
