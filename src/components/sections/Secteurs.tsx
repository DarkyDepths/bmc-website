import { ChapterHead } from '@/components/ui/ChapterHead';
import { Reveal } from '@/components/ui/Reveal';
import type { Dict } from '@/i18n/dictionaries';

/**
 * Chapter 04. The sectors are an annex table, not a grid of tiles: an index column, the
 * sector, and what BMC actually does there. Set as a description list so the pairing
 * survives without markup pretending to be a spreadsheet.
 */
export function Secteurs({ dict }: { dict: Dict }) {
  return (
    <section id="secteurs" className="shell scroll-mt-24 py-[var(--chapter-gap)]">
      <div className="grid12">
        <ChapterHead
          id="secteurs"
          label={dict.nav.chapters.secteurs}
          title={dict.secteurs.title}
          intro={dict.secteurs.intro}
          className="col-span-4 md:col-span-8"
        />
      </div>

      <div className="mt-14">
        <Reveal>
          <div className="hidden border-b border-rule-2 pb-2.5 md:grid md:grid-cols-[3.5rem_1fr_1.35fr] md:gap-6">
            <span aria-hidden="true" />
            <span className="label">{dict.secteurs.colSector}</span>
            <span className="label">{dict.secteurs.colFocus}</span>
          </div>
        </Reveal>

        <dl className="m-0">
          {dict.secteurs.items.map((item, index) => (
            <Reveal key={item.name} delay={index * 40}>
              <div className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 gap-y-1.5 border-b border-rule py-5 md:grid-cols-[3.5rem_1fr_1.35fr] md:gap-6">
                <span className="label folio text-[color:var(--signal)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <dt className="font-display text-[1.375rem] leading-[1.12] tracking-[-0.012em] md:text-[1.5rem]">
                  {item.name}
                </dt>
                <dd className="col-start-2 m-0 text-small leading-relaxed text-ink-2 md:col-start-3">
                  {item.note}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
