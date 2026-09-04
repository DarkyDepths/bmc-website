'use client';

import { useEffect, useRef, useState } from 'react';

import { useReading } from '@/components/providers/Reading';
import { CHAPTER_TOTAL, folio, NUMBERED_CHAPTERS, type ChapterId, type Locale } from '@/i18n/config';
import { cn } from '@/lib/cn';

import { LocaleSwitch } from './LocaleSwitch';
import { Wordmark } from './Wordmark';

type HeaderProps = {
  locale: Locale;
  brand: string;
  brandFull: string;
  labels: Record<ChapterId, string>;
  contactLabel: string;
  summaryLabel: string;
  openLabel: string;
  closeLabel: string;
  languageLabel: string;
};

export function Header({
  locale,
  brand,
  brandFull,
  labels,
  contactLabel,
  summaryLabel,
  openLabel,
  closeLabel,
  languageLabel,
}: HeaderProps) {
  const { active, scrolled, progress } = useReading();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Escape closes, and scrolling is locked while the sheet is open. */
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);

    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-out-expo',
        scrolled || open ? 'bg-paper' : 'bg-transparent',
      )}
    >
      {/* py-4 at both sizes: 16 + the 40px logo + 16 is exactly --header-h, so the offsets
          the pinned track and the running head are calculated from stay true. */}
      <div className="flex items-center justify-between gap-6 px-[var(--gutter)] py-4">
        {/* inline-flex, not the default inline: an inline box around a flex child still
            reserves room for a text baseline, which added 8px and pushed the header past
            --header-h. */}
        <a href="#couverture" className="inline-flex rounded-xs" aria-label={brandFull}>
          <Wordmark label={brand} name={brandFull} />
        </a>

        {/* Running head. The chapter you are actually in, the way a bound report
            repeats its section title at the top of every page. */}
        <p
          aria-hidden="true"
          className={cn(
            'hidden flex-1 items-baseline justify-center gap-3 transition-opacity duration-500 ease-out-expo lg:flex',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        >
          <span key={active} className="label animate-[bmc-rise_520ms_var(--ease-out-expo)]">
            <span className="folio text-[color:var(--color-wine)]">{folio(active)}</span>
            <span className="mx-2 opacity-40">·</span>
            {labels[active]}
          </span>
        </p>

        <div className="flex items-center gap-5">
          <LocaleSwitch current={locale} label={languageLabel} className="hidden sm:flex" />

          <a
            href="#contact"
            className="label hidden text-ink transition-colors duration-300 ease-out-expo hover:text-wine lg:inline-block"
          >
            {contactLabel}
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="chapter-sheet"
            className="label -m-2 flex items-center gap-2.5 p-2 text-ink lg:hidden"
          >
            {open ? closeLabel : summaryLabel}
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span
                className={cn(
                  'absolute inset-x-0 top-0 h-px bg-current transition-transform duration-[420ms] ease-out-expo',
                  open && 'translate-y-[5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-[420ms] ease-out-expo',
                  open && '-translate-y-[5px] -rotate-45',
                )}
              />
            </span>
            <span className="sr-only">{open ? closeLabel : openLabel}</span>
          </button>
        </div>
      </div>

      {/* Progress rule. Carries the trajectory on viewports too small for the rail. */}
      <div className="relative h-px w-full bg-rule">
        <div
          aria-hidden="true"
          className="h-px origin-left bg-wine transition-transform duration-150 ease-linear rtl:origin-right"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Contents sheet, small viewports only. */}
      <div
        id="chapter-sheet"
        ref={panelRef}
        hidden={!open}
        className="bg-paper px-[var(--gutter)] pb-10 pt-6 lg:hidden"
      >
        <ol className="m-0 list-none p-0">
          {NUMBERED_CHAPTERS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-rule py-4"
              >
                <span className="label folio text-[color:var(--color-wine)]">{folio(id)}</span>
                <span className="font-display text-title leading-none">{labels[id]}</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-7 flex items-center justify-between">
          <LocaleSwitch current={locale} label={languageLabel} />
          <span className="label">
            <span className="folio">{String(CHAPTER_TOTAL).padStart(2, '0')}</span>
            <span className="mx-2 opacity-40">·</span>
            {summaryLabel}
          </span>
        </div>
      </div>
    </header>
  );
}
