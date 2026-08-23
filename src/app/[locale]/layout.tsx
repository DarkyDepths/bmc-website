import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

/* Self-hosted. Every family is subset with `unicode-range`, so a French reader never
   downloads the Arabic faces and an Arabic reader never downloads Young Serif. */
import '@fontsource/young-serif/400.css';
import '@fontsource-variable/schibsted-grotesk/wght.css';
import '@fontsource/amiri/400.css';
import '@fontsource/amiri/700.css';
import '@fontsource-variable/readex-pro/wght.css';
import '../globals.css';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Rail } from '@/components/layout/Rail';
import { Veil } from '@/components/layout/Veil';
import { ReadingProvider } from '@/components/providers/Reading';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { isLocale, localeMeta, locales, SITE_URL, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

type LayoutParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f2ec' },
    { media: '(prefers-color-scheme: dark)', color: '#093838' },
  ],
  colorScheme: 'light',
};

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);
  const title = `${dict.brand.full} · ${dict.meta.titleTemplate}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: dict.brand.full,
    authors: [{ name: dict.brand.full }],
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeMeta[l].hreflang, `/${l}/`])),
        'x-default': '/fr/',
      },
    },
    openGraph: {
      type: 'website',
      siteName: dict.brand.full,
      title,
      description: dict.meta.description,
      url: `${SITE_URL}/${locale}/`,
      locale: locale === 'fr' ? 'fr_TN' : locale === 'ar' ? 'ar_TN' : 'en_GB',
    },
    twitter: {
      card: 'summary',
      title,
      description: dict.meta.description,
    },
    icons: {
      /* The .ico is not only for old browsers: it is also what stops a browser's
         implicit /favicon.ico request from falling into the [locale] segment. */
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutParams & { children: ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed = locale as Locale;
  const dict = getDictionary(typed);
  const { dir } = localeMeta[typed];
  const rtl = dir === 'rtl';

  /* `suppressHydrationWarning` below covers exactly one attribute: the `data-js` flag the
     inline script stamps on <html> before React hydrates. The server cannot render it,
     that would defeat the point, so the two trees legitimately differ there. It applies to
     this element's own attributes only, not to the tree beneath it. */
  return (
    <html lang={typed} dir={dir} suppressHydrationWarning>
      <body>
        {/* Runs before any revealable content is parsed, and decides two things that
            would otherwise flash:

            `data-js` marks the document as scripted, so a failed or blocked bundle leaves
            everything visible instead of transparent.

            `data-veil` decides whether the cover sheet appears at all. Not on a repeat
            visit inside the same session, and not for a reader who has asked for less
            motion. Both answers are needed before first paint, which is why they are
            settled here rather than in an effect. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              /* The whole body is guarded. Nothing here is important enough to be worth
                 a thrown exception in the document head position, and a half-applied
                 result is worse than none: `data-veil` unset means the sheet never shows,
                 which is the safe way to fail. */
              '(function(){try{' +
              "var e=document.documentElement;e.dataset.js='on';var v='on';" +
              "try{if(sessionStorage.getItem('bmc-opened'))v='off'}catch(x){}" +
              "try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)v='off'}catch(x){}" +
              'e.dataset.veil=v}catch(x){}})()',
          }}
        />

        <Veil />

        <a className="skip" href="#contenu">
          {dict.a11y.skip}
        </a>

        <ReadingProvider>
          <Header
            locale={typed}
            brand={dict.brand.short}
            labels={dict.nav.chapters}
            contactLabel={dict.nav.contact}
            summaryLabel={dict.nav.summary}
            openLabel={dict.nav.openMenu}
            closeLabel={dict.nav.closeMenu}
            languageLabel={dict.nav.languageMenu}
          />

          <Rail
            labels={dict.nav.chapters}
            navLabel={dict.a11y.rail}
            hint={dict.a11y.railHint}
            rtl={rtl}
          />

          <main id="contenu">{children}</main>

          <Footer dict={dict} locale={typed} />
        </ReadingProvider>

        <SmoothScroll />
      </body>
    </html>
  );
}
