import type { ReactNode } from 'react';

import { CHAPTER_TOTAL, folio, type ChapterId } from '@/i18n/config';
import { cn } from '@/lib/cn';

import { Reveal } from './Reveal';

type ChapterHeadProps = {
  id: Exclude<ChapterId, 'couverture'>;
  label: string;
  title: ReactNode;
  intro?: string;
  className?: string;
};

/**
 * The head of a chapter in the memorandum: folio, running label, a rule that carries to the
 * end of the measure, then the display line. Start-aligned so it mirrors under RTL without
 * a second rule.
 */
export function ChapterHead({ id, label, title, intro, className }: ChapterHeadProps) {
  return (
    <header className={cn(className)}>
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="label folio text-[color:var(--signal)]">
            {folio(id)}
            <span className="opacity-45"> / {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
          </span>
          <span className="label">{label}</span>
        </div>
        <hr className="hr mt-3.5" />
      </Reveal>

      <Reveal delay={90}>
        <h2 className="mt-9 text-display max-w-[19ch] sm:max-w-[24ch]">{title}</h2>
      </Reveal>

      {intro ? (
        <Reveal delay={160}>
          <p className="measure mt-7 text-lede leading-[1.5] text-[color:var(--text-2)]">
            {intro}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
