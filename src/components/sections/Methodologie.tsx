'use client';

import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { ChapterHead } from '@/components/ui/ChapterHead';
import { Reveal } from '@/components/ui/Reveal';
import type { Dict } from '@/i18n/dictionaries';
import { cn } from '@/lib/cn';

type Phase = Dict['methode']['phases'][number];

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Chapter 03. On a wide screen with motion allowed, the five phases become a pinned
 * horizontal track: the section holds still while the method advances sideways, which is
 * the one place on this site where the reader physically moves through a sequence.
 *
 * Everywhere else, and under reduced motion, the same five panels are a vertical stack.
 * The swap is done in CSS, so there is no client-side branch and no hydration mismatch.
 */
export function Methodologie({ dict, rtl }: { dict: Dict; rtl: boolean }) {
  const phases = dict.methode.phases;

  const host = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: host,
    offset: ['start start', 'end end'],
  });

  /* Measure the real overflow rather than guessing it from viewport units. */
  useEffect(() => {
    const el = inner.current;
    if (!el) return;

    const measure = () => setDistance(Math.max(0, el.scrollWidth - el.clientWidth));
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, rtl ? distance : -distance]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const index = Math.min(phases.length - 1, Math.floor(value * phases.length + 0.0001));
    setCurrent(Math.max(0, index));
  });

  return (
    <section id="methode" className="plate scroll-mt-0">
      <div className="shell pb-14 pt-[var(--chapter-gap)]">
        <div className="grid12">
          <ChapterHead
            id="methode"
            label={dict.nav.chapters.methode}
            title={dict.methode.title}
            intro={dict.methode.intro}
            className="col-span-4 md:col-span-8"
          />
        </div>
      </div>

      {/* Pinned track. */}
      <div ref={host} className="method-track" style={{ height: `${phases.length * 78}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          {/* Where you are in the sequence, at the head of the frame.
              This used to be a running head repeating the folio and the chapter label.
              It read as a duplicate title, because the chapter head above the track is
              still on screen during the whole approach to the pin. The fixed site header
              already carries the chapter, so the frame carries the phase instead. */}
          <div className="shell shrink-0 pt-[calc(var(--header-h)+2.25rem)]">
            <div className="flex items-center gap-5">
              <span className="label whitespace-nowrap">
                {dict.methode.progressLabel}{' '}
                <span className="folio text-[color:var(--signal)]">{pad(current + 1)}</span>
                <span className="opacity-40"> / {pad(phases.length)}</span>
              </span>
              <span className="flex flex-1 gap-1.5" aria-hidden="true">
                {phases.map((phase, index) => (
                  <span
                    key={phase.name}
                    className={cn(
                      'h-px flex-1 transition-colors duration-500 ease-out-expo',
                      index <= current ? 'bg-[color:var(--signal)]' : 'bg-pine-line',
                    )}
                  />
                ))}
              </span>
            </div>
          </div>

          {/* Phases occupy whatever height is left, vertically centred in it. */}
          <div className="method-fade flex min-h-0 flex-1 items-center pb-[clamp(2rem,6vh,3.5rem)]">
            <motion.div ref={inner} style={{ x }} className="flex w-full ps-[var(--rail-w)]">
              {phases.map((phase, index) => (
                <PhasePanel
                  key={phase.name}
                  phase={phase}
                  index={index}
                  total={phases.length}
                  className="w-[clamp(21rem,30vw,28rem)] flex-none"
                />
              ))}
              <div aria-hidden="true" className="w-[var(--gutter)] flex-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stacked equivalent. */}
      <div className="method-stack shell pb-[var(--chapter-gap)]">
        <ol className="m-0 list-none p-0">
          {phases.map((phase, index) => (
            <Reveal as="li" key={phase.name} delay={index * 60}>
              <PhasePanel
                phase={phase}
                index={index}
                total={phases.length}
                className="py-9"
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PhasePanel({
  phase,
  index,
  total,
  className,
}: {
  phase: Phase;
  index: number;
  total: number;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'border-s border-[color:var(--hairline)] pe-10 ps-7 sm:ps-9',
        className,
      )}
    >
      <p className="label folio">
        <span className="text-[color:var(--signal)]">{pad(index + 1)}</span>
        <span className="opacity-40"> / {pad(total)}</span>
      </p>

      <h3 className="mt-7 font-display text-title leading-[1.06] tracking-[-0.015em] text-bone">
        {phase.name}
      </h3>

      <p className="mt-5 text-lede leading-[1.4] text-bone">{phase.claim}</p>

      <p className="measure-tight mt-4 text-small leading-[1.7] text-bone-2">{phase.detail}</p>
    </article>
  );
}
