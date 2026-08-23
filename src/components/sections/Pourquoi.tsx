import { ChapterHead } from '@/components/ui/ChapterHead';
import { Reveal } from '@/components/ui/Reveal';
import type { Dict } from '@/i18n/dictionaries';
import { cn } from '@/lib/cn';

/**
 * Chapter 05. Six commitments on an inset band, laid out as a ruled matrix. The rules are
 * the structure: no card, no border box, no shadow, and the numeral carries the eye rather
 * than a decorative icon.
 */
export function Pourquoi({ dict }: { dict: Dict }) {
  return (
    <section id="pourquoi" className="scroll-mt-24 bg-paper-2 py-[var(--chapter-gap)]">
      <div className="shell">
        <div className="grid12">
          <ChapterHead
            id="pourquoi"
            label={dict.nav.chapters.pourquoi}
            title={dict.pourquoi.title}
            intro={dict.pourquoi.intro}
            className="col-span-4 md:col-span-8"
          />
        </div>

        <ol className="m-0 mt-14 grid list-none grid-cols-1 border-t border-rule-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {dict.pourquoi.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.name}
              delay={(index % 3) * 80}
              className={cn(
                'border-b border-rule py-8',
                // Vertical rules only between columns, never on the reading edge.
                'sm:[&:nth-child(2n+2)]:border-s sm:[&:nth-child(2n+2)]:border-rule sm:[&:nth-child(2n+2)]:ps-7',
                'lg:[&:nth-child(2n+2)]:border-s-0 lg:[&:nth-child(2n+2)]:ps-0',
                'lg:[&:not(:nth-child(3n+1))]:border-s lg:[&:not(:nth-child(3n+1))]:border-rule lg:[&:not(:nth-child(3n+1))]:ps-7',
                'sm:pe-7 lg:pe-8',
              )}
            >
              <p className="label folio text-[color:var(--signal)]">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-5 font-display text-[1.3125rem] leading-[1.15] tracking-[-0.012em]">
                {item.name}
              </h3>
              <p className="mt-3.5 text-small leading-[1.7] text-ink-2">{item.detail}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
