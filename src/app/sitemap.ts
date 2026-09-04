import type { MetadataRoute } from 'next';

import { defaultLocale, localeMeta, locales, SITE_URL } from '@/i18n/config';

/**
 * Three URLs, one per locale, each declaring the other two as alternates so a crawler
 * treats them as translations rather than as duplicate pages. Matches the `hreflang` set
 * in `generateMetadata` and the one in the hand-written root shell.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [localeMeta[l].hreflang, `${SITE_URL}/${l}/`]),
  );

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === defaultLocale ? 1 : 0.8,
    alternates: { languages: { ...languages, 'x-default': `${SITE_URL}/${defaultLocale}/` } },
  }));
}
