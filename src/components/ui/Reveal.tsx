'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { whenOpen } from '@/lib/open';

type RevealProps = {
  children: ReactNode;
  /** Stagger, in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Reveals once on enter and then stops observing. Deliberately CSS driven rather than
 * animated in JS: the transition lives in globals.css, gated behind `[data-js]`, so if the
 * script never runs the content is simply visible instead of permanently transparent.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.dataset.reveal = 'in';
      return;
    }

    let observer: IntersectionObserver | undefined;

    /* Waits for the cover sheet, if there is one. Everything above the fold is already
       intersecting while the veil is up, so observing immediately would spend the whole
       reveal behind it. */
    const cancel = whenOpen(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          node.dataset.reveal = 'in';
          observer?.disconnect();
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
      );

      observer.observe(node);
    });

    return () => {
      cancel();
      observer?.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
