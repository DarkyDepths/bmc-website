import { Action } from '@/components/ui/Action';
import { Reveal } from '@/components/ui/Reveal';
import { Tally } from '@/components/ui/Tally';
import { CoverChart } from '@/components/visual/CoverChart';
import { CONTACT } from '@/i18n/config';
import type { Dict } from '@/i18n/dictionaries';
import { cn } from '@/lib/cn';

/**
 * Chapter 00. The cover of the memorandum: title, the claim, and the plate.
 */
export function Cover({ dict, rtl }: { dict: Dict; rtl: boolean }) {
  const cover = dict.cover;

  return (
    <section
      id="couverture"
      className="shell pb-[var(--chapter-gap)] pt-[clamp(4.75rem,11vh,8.5rem)]"
    >
      <div className="grid12 gap-y-9">
        <Reveal className="col-span-4 md:col-span-12">
          <p className="label">{cover.label}</p>
        </Reveal>

        <Reveal delay={90} className="col-span-4 md:col-span-11 lg:col-span-10">
          <h1 className="text-mega tracking-[-0.032em]">
            {cover.titleLead}{' '}
            <em className="not-italic text-[color:var(--color-wine)]">{cover.titleAccent}</em>
          </h1>
        </Reveal>

        <div className="col-span-4 md:col-span-5 md:col-start-1 lg:col-span-5">
          <Reveal delay={200}>
            <p className="measure text-lede leading-[1.5] text-ink-2">{cover.lede}</p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Action href={CONTACT.phoneHref}>{cover.primary}</Action>
              <Action href="#expertises" variant="ghost">
                {cover.secondary}
              </Action>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={360}
          className="col-span-4 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7"
        >
          <CoverChart
            phases={cover.chart.phases}
            caption={cover.chart.caption}
            note={cover.chart.note}
            axis={cover.chart.axis}
            title={dict.a11y.chartTitle}
            description={dict.a11y.chartDesc}
            rtl={rtl}
          />
        </Reveal>

        {/* Cover foot: the three figures the brief actually supports, set as a ruled
            exhibit rather than as three tiles. */}
        <Reveal delay={460} className="col-span-4 md:col-span-12">
          <div className="border-t border-rule-2 pt-6">
            <p className="label mb-5">{cover.marksLabel}</p>
            {/* One column on a phone. Three tracks of ~86px cannot hold a label like
                "Secteurs d'intervention" set in caps, and it spills past the gutter. */}
            <dl className="m-0 grid grid-cols-1 gap-x-4 sm:grid-cols-3">
              {cover.marks.map((mark, index) => (
                <div
                  key={mark.label}
                  className={cn(
                    index > 0 &&
                      'mt-5 border-t border-rule pt-5 sm:mt-0 sm:border-t-0 sm:border-s sm:pt-0 sm:ps-5 md:ps-7',
                  )}
                >
                  <dt className="label leading-snug">{mark.label}</dt>
                  <dd className="tabular m-0 mt-2.5 font-display text-[clamp(1.9rem,4.4vw,3.25rem)] leading-none tracking-[-0.02em]">
                    <Tally value={mark.figure} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
