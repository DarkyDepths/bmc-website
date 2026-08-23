'use client';

import { useState } from 'react';

import { ChapterHead } from '@/components/ui/ChapterHead';
import { Reveal } from '@/components/ui/Reveal';
import type { Dict } from '@/i18n/dictionaries';
import { cn } from '@/lib/cn';

/**
 * Chapter 02. Eight expertises as an index, not a card grid: a numbered row, a name, a
 * one-line summary, and the detail on demand. One row open at a time keeps the schedule
 * readable at a glance, which is the point of an index.
 */
export function Expertises({ dict }: { dict: Dict }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="expertises" className="shell scroll-mt-24 py-[var(--chapter-gap)]">
      <div className="grid12">
        <ChapterHead
          id="expertises"
          label={dict.nav.chapters.expertises}
          title={dict.expertises.title}
          intro={dict.expertises.intro}
          className="col-span-4 md:col-span-8"
        />
      </div>

      <Reveal>
        <p className="label mt-14 mb-4">{dict.expertises.hint}</p>
      </Reveal>

      <div>
        {dict.expertises.items.map((item, index) => {
          const isOpen = open === item.id;
          const panelId = `expertise-${item.id}`;

          return (
            <Reveal key={item.id} delay={index * 45}>
              <div
                className={cn(
                  'row',
                  isOpen ? 'bg-paper-2' : 'hover:bg-paper-2',
                )}
                data-open={isOpen}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`${panelId}-trigger`}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    /* `font-body` is explicit: this button lives inside an h3, which
                       inherits the display serif, and the summary must not. */
                    className="flex w-full items-baseline gap-4 px-1 py-6 text-start font-body sm:gap-7 sm:px-3"
                  >
                    <span className="label folio shrink-0 text-[color:var(--color-wine)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="flex-1">
                      <span className="block font-display text-title leading-[1.08] tracking-[-0.015em]">
                        {item.name}
                      </span>
                      <span className="mt-2 block text-small text-ink-2 md:hidden">
                        {item.summary}
                      </span>
                    </span>

                    <span className="hidden max-w-[34ch] flex-1 text-small text-ink-2 md:block">
                      {item.summary}
                    </span>

                    {/* Plus becomes minus. */}
                    <span
                      aria-hidden="true"
                      className="relative ms-2 block h-3 w-3 shrink-0 self-center"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink-3" />
                      <span
                        className={cn(
                          'absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink-3',
                          'transition-transform duration-500 ease-out-expo',
                          isOpen ? 'scale-y-0' : 'scale-y-100',
                        )}
                      />
                    </span>
                  </button>
                </h3>

                {/* `inert` keeps the collapsed copy out of the accessibility tree and out
                    of the tab order while still allowing the height transition. */}
                <div
                  id={panelId}
                  className="disclosure"
                  data-open={isOpen}
                  role="region"
                  aria-labelledby={`${panelId}-trigger`}
                  inert={!isOpen}
                >
                  <div>
                    <p className="measure-tight px-1 pb-7 text-small leading-relaxed text-ink-2 sm:px-3 sm:ps-[4.5rem]">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
        <hr className="hr" />
      </div>
    </section>
  );
}
