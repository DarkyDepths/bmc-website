import { Cabinet } from '@/components/sections/Cabinet';
import { Contact } from '@/components/sections/Contact';
import { Cover } from '@/components/sections/Cover';
import { Expertises } from '@/components/sections/Expertises';
import { Methodologie } from '@/components/sections/Methodologie';
import { Pourquoi } from '@/components/sections/Pourquoi';
import { Secteurs } from '@/components/sections/Secteurs';
import { isLocale, localeMeta, SITE_URL, CONTACT, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

type PageParams = { params: Promise<{ locale: string }> };

/**
 * The document, in order. Six numbered chapters behind a cover, and nothing else: this is a
 * single bound file, not a site map.
 */
export default async function LocalePage({ params }: PageParams) {
  const { locale } = await params;
  const typed = (isLocale(locale) ? locale : 'fr') as Locale;
  const dict = getDictionary(typed);
  const rtl = localeMeta[typed].dir === 'rtl';

  const organisation = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: dict.brand.full,
    alternateName: dict.brand.short,
    description: dict.meta.description,
    url: `${SITE_URL}/${typed}/`,
    telephone: CONTACT.phoneDisplay,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.addressLines[0],
      addressLocality: CONTACT.addressLines[1],
      addressCountry: 'TN',
    },
    areaServed: 'TN',
    knowsLanguage: ['fr', 'en', 'ar'],
    serviceType: dict.expertises.items.map((item) => item.name),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
      />

      <Cover dict={dict} rtl={rtl} />
      <Cabinet dict={dict} />
      <Expertises dict={dict} />
      <Methodologie dict={dict} rtl={rtl} />
      <Secteurs dict={dict} />
      <Pourquoi dict={dict} />
      <Contact dict={dict} locale={typed} />
    </>
  );
}
