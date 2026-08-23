import { ContactForm } from '@/components/sections/ContactForm';
import { Action } from '@/components/ui/Action';
import { ChapterHead } from '@/components/ui/ChapterHead';
import { Reveal } from '@/components/ui/Reveal';
import { Seal } from '@/components/visual/Seal';
import { CONTACT, type Locale } from '@/i18n/config';
import type { Dict } from '@/i18n/dictionaries';

/**
 * Chapter 06. The closing plate: the ask, the reply slip, the coordinates, and the stamp.
 */
export function Contact({ dict, locale }: { dict: Dict; locale: Locale }) {
  return (
    <section id="contact" className="plate scroll-mt-24">
      <div className="shell py-[var(--chapter-gap)]">
        <div className="grid12 gap-y-14">
          <ChapterHead
            id="contact"
            label={dict.nav.chapters.contact}
            title={dict.contact.title}
            className="col-span-4 md:col-span-7"
          />

          {/* Forced to a new row so the plate does not end up with everything stacked
              in the outer column and a dead quadrant under the title. */}
          <div className="col-span-4 md:col-span-6 md:col-start-1 lg:col-span-5 lg:col-start-1">
            <Reveal>
              <p className="measure text-lede leading-[1.55] text-bone-2">{dict.contact.body}</p>
            </Reveal>

            {/* One action, not two. The second used to be a `mailto:`, which is now the
                reply slip below: a button that opens someone's mail client next to a form
                that sends the same message is the same ask twice. The address is still
                printed in the coordinates opposite, for readers who want their own copy
                of what they sent. */}
            <Reveal delay={110} className="mt-10">
              <Action href={CONTACT.phoneHref}>{dict.contact.primary}</Action>
            </Reveal>
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            <Reveal delay={80}>
              <address className="not-italic">
                <div className="border-t border-[color:var(--hairline)] pt-4">
                  <p className="label">{dict.contact.addressLabel}</p>
                  <p className="mt-2 text-body leading-relaxed">
                    {CONTACT.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="mt-7 border-t border-[color:var(--hairline)] pt-4">
                  <p className="label">{dict.contact.phoneLabel}</p>
                  <p className="mt-2">
                    <a
                      href={CONTACT.phoneHref}
                      className="ltr inline-block text-body transition-colors duration-300 ease-out-expo hover:text-[color:var(--signal)]"
                    >
                      {CONTACT.phoneDisplay}
                    </a>
                  </p>
                </div>

                <div className="mt-7 border-t border-[color:var(--hairline)] pt-4">
                  <p className="label">{dict.contact.emailLabel}</p>
                  <p className="mt-2">
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="ltr inline-block text-body transition-colors duration-300 ease-out-expo hover:text-[color:var(--signal)]"
                    >
                      {CONTACT.email}
                    </a>
                  </p>
                </div>
              </address>
            </Reveal>
          </div>

          {/* The reply slip runs across the foot of the plate rather than down the
              column beside the address: fields squeezed into five columns are narrower
              than anything anyone would want to type into. */}
          <div className="col-span-4 md:col-span-12 lg:col-span-8">
            <ContactForm dict={dict} locale={locale} />
          </div>

          {/* Last in the source, so a phone reads title, ask, coordinates, slip, stamp.
              From md up it is pulled into the first row opposite the title: that quadrant
              is otherwise empty, and a stamp belongs at the head of a letter, not adrift
              two hundred pixels under the last line of the address. */}
          <Reveal
            delay={220}
            className="col-span-4 flex justify-start md:col-span-5 md:col-start-8 md:row-start-1 md:justify-end lg:col-span-4 lg:col-start-9"
          >
            <Seal caption={dict.contact.sealCaption} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
