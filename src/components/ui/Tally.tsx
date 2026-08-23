'use client';

import { useEffect, useRef, useState } from 'react';

import { whenOpen } from '@/lib/open';

/**
 * Counts a figure up to its printed value once, when it first comes into view.
 *
 * The finished value is what renders on the server and what sits in the DOM before this
 * ever runs, so the exhibit is correct with JavaScript disabled, in a crawler, and under
 * reduced motion. The animation is an enhancement on top of a value that is already right.
 *
 * Any non-digit around the number is preserved, and the digit count is preserved too, so
 * "15+" counts to 15 and keeps its plus, and "08" counts through "01", "02" rather than
 * losing its leading zero halfway. `.tabular` on the element keeps the glyphs from
 * shuffling sideways while the digits change.
 */
export function Tally({
  value,
  className,
  duration = 1150,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const parts = /^(\D*)(\d+)(\D*)$/.exec(value);
    if (!parts) return;

    const [, prefix, digits, suffix] = parts;
    const target = Number(digits);
    const width = digits.length;
    if (!Number.isFinite(target) || target === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      /* The same ease-out-expo the rest of the site uses: fast, then settling. */
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const current = Math.round(eased * target);

      setShown(`${prefix}${String(current).padStart(width, '0')}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(step);
    };

    let observer: IntersectionObserver | undefined;

    /* Waits for the cover sheet, if there is one: the exhibit is above the fold, so it
       would otherwise finish counting before anyone could see it. */
    const cancel = whenOpen(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          setShown(`${prefix}${'0'.padStart(width, '0')}${suffix}`);
          frame = requestAnimationFrame(step);
        },
        { threshold: 0.6 },
      );

      observer.observe(node);
    });

    return () => {
      cancel();
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
