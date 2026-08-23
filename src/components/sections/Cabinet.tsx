import { ChapterHead } from '@/components/ui/ChapterHead';
import { Reveal } from '@/components/ui/Reveal';
import type { Dict } from '@/i18n/dictionaries';

/**
 * Chapter 01. Who the cabinet is, and the ten disciplines it actually covers, set as a
 * ruled schedule down the outer column.
 */
export function Cabinet({ dict }: { dict: Dict }) {
  return (
    <section id="cabinet" className="shell scroll-mt-24 py-[var(--chapter-gap)]">
      <div className="grid12 gap-y-14">
        <ChapterHead
          id="cabinet"
          label={dict.nav.chapters.cabinet}
          title={dict.cabinet.title}
          className="col-span-4 md:col-span-8"
        />

        <div className="col-span-4 md:col-span-6 lg:col-span-5">
          {/* The spacing sits on the wrapper, not the paragraph: each `p` is the only
              child of its own Reveal, so `first:` would match every one of them. */}
          {dict.cabinet.body.map((paragraph, index) => (
            <Reveal key={index} delay={index * 90} className={index > 0 ? 'mt-6' : undefined}>
              <p className="measure text-body leading-[1.7] text-ink-2">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <div className="col-span-4 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
          <Reveal>
            <p className="label border-b border-rule pb-3">{dict.cabinet.disciplinesLabel}</p>
          </Reveal>

          <ul className="m-0 list-none p-0">
            {dict.cabinet.disciplines.map((discipline, index) => (
              <Reveal as="li" key={discipline} delay={40 + index * 35}>
                <span className="flex items-baseline gap-3.5 border-b border-rule py-3 text-small">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-px w-3 shrink-0 bg-[color:var(--color-wine)]"
                  />
                  {discipline}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
