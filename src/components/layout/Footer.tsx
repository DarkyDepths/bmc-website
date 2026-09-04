import { Wordmark } from '@/components/layout/Wordmark';
import { CONTACT, type Locale } from '@/i18n/config';
import type { Dict } from '@/i18n/dictionaries';

import { LocaleSwitch } from './LocaleSwitch';

/**
 * The back cover: deepest surface on the page, coordinates repeated, and the imprint line.
 */
export function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="plate plate-deep">
      <div className="shell py-14 lg:py-16">
        <div className="grid12 gap-y-10">
          <div className="col-span-4 md:col-span-5">
            <Wordmark
              label={dict.brand.short}
              name={dict.brand.full}
              tone="bone"
              logoClassName="h-12"
            />
            <p className="mt-4 max-w-[34ch] text-small leading-relaxed text-bone-2">
              {dict.footer.tagline}
            </p>
          </div>

          <address className="col-span-4 not-italic md:col-span-4 md:col-start-7">
            <p className="label">{dict.contact.addressLabel}</p>
            <p className="mt-2.5 text-small leading-relaxed text-bone-2">
              {CONTACT.addressLines.join(', ')}
            </p>
            <p className="mt-4">
              <a
                href={CONTACT.phoneHref}
                className="ltr inline-block text-small text-bone transition-colors duration-300 ease-out-expo hover:text-wine-bright"
              >
                {CONTACT.phoneDisplay}
              </a>
            </p>
            <p className="mt-1">
              <a
                href={`mailto:${CONTACT.email}`}
                className="ltr inline-block text-small text-bone transition-colors duration-300 ease-out-expo hover:text-wine-bright"
              >
                {CONTACT.email}
              </a>
            </p>
          </address>

          <div className="col-span-4 md:col-span-2 md:col-start-11 md:justify-self-end">
            <p className="label mb-2.5">{dict.nav.language}</p>
            <LocaleSwitch current={locale} label={dict.nav.languageMenu} tone="bone" />
          </div>
        </div>

        <hr className="hr mt-12 opacity-60" />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-micro text-bone-3">
            <span className="folio">{year}</span> {dict.brand.full}. {dict.footer.rights}
          </p>
          <a
            href="#couverture"
            className="label text-bone-3 transition-colors duration-300 ease-out-expo hover:text-bone"
          >
            {dict.a11y.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
