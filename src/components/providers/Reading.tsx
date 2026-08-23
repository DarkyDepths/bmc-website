'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { CHAPTERS, type ChapterId } from '@/i18n/config';

type ReadingState = {
  /** Chapter currently occupying the middle of the viewport. */
  active: ChapterId;
  /** Index of `active` within CHAPTERS. */
  activeIndex: number;
  /** Whole document scroll progress, 0 to 1. */
  progress: number;
  /** True once the reader has moved off the cover. */
  scrolled: boolean;
};

const ReadingContext = createContext<ReadingState>({
  active: 'couverture',
  activeIndex: 0,
  progress: 0,
  scrolled: false,
});

export function useReading(): ReadingState {
  return useContext(ReadingContext);
}

/**
 * Owns the two pieces of scroll state the chrome needs, so the header and the trajectory
 * rail observe the document once between them rather than once each.
 *
 * Progress is sampled inside a rAF and written only when it moves by more than half a
 * percent, which keeps this off the critical path during a smooth scroll.
 */
export function ReadingProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ChapterId>('couverture');
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const frame = useRef<number | null>(null);
  const lastProgress = useRef(0);

  useEffect(() => {
    const sections = CHAPTERS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    /* Which chapter owns the middle band of the viewport. */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.id as ChapterId;
        if (CHAPTERS.includes(id)) setActive(id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((section) => observer.observe(section));

    const measure = () => {
      frame.current = null;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const next = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;

      if (Math.abs(next - lastProgress.current) > 0.005 || next === 0 || next === 1) {
        lastProgress.current = next;
        setProgress(next);
      }
      setScrolled(window.scrollY > 24);
    };

    const onScroll = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const value = useMemo<ReadingState>(
    () => ({
      active,
      activeIndex: CHAPTERS.indexOf(active),
      progress,
      scrolled,
    }),
    [active, progress, scrolled],
  );

  return <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>;
}
