/**
 * Locale configuration.
 *
 * i18n is hand rolled rather than delegated to a library. The site is a single page in
 * three locales and is statically exported, so a typed dictionary plus `generateStaticParams`
 * is both smaller and more predictable than a routing package that expects middleware.
 */

export const locales = ['fr', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeMeta: Record<
  Locale,
  { label: string; short: string; dir: 'ltr' | 'rtl'; hreflang: string }
> = {
  fr: { label: 'Français', short: 'FR', dir: 'ltr', hreflang: 'fr' },
  en: { label: 'English', short: 'EN', dir: 'ltr', hreflang: 'en' },
  ar: { label: 'العربية', short: 'AR', dir: 'rtl', hreflang: 'ar' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Chapter ids are shared across locales so anchors, the trajectory rail and the running
 * head all agree. Only the labels are translated. The cover is chapter 00, which is why
 * the folio of the first real chapter is 01 and the denominator is 06.
 */
export const CHAPTERS = [
  'couverture',
  'cabinet',
  'expertises',
  'methode',
  'secteurs',
  'pourquoi',
  'contact',
] as const;

export type ChapterId = (typeof CHAPTERS)[number];

/**
 * Chapters rendered as full-bleed pine plates. The trajectory rail is fixed and cannot
 * see what is behind it, so it reads this to know which palette to wear.
 */
export const PLATE_CHAPTERS: ReadonlySet<ChapterId> = new Set<ChapterId>(['methode', 'contact']);

/** Chapters that carry a folio. The cover is excluded. */
export const NUMBERED_CHAPTERS = CHAPTERS.filter(
  (id): id is Exclude<ChapterId, 'couverture'> => id !== 'couverture',
);

export const CHAPTER_TOTAL = NUMBERED_CHAPTERS.length;

/** `folio('expertises')` -> `'02'`. Returns `'00'` for the cover. */
export function folio(id: ChapterId): string {
  const index = NUMBERED_CHAPTERS.indexOf(id as Exclude<ChapterId, 'couverture'>);
  return String(index + 1).padStart(2, '0');
}

/**
 * Canonical origin: the apex, not `www`. Drives canonical URLs, hreflang, Open Graph,
 * robots.txt, sitemap.xml and the contact form's no-JS return address. Whichever of the
 * two the host answers on, the other must redirect to it, or crawlers see two sites.
 */
export const SITE_URL = 'https://best-bmc.com';

/**
 * Real coordinates. `email` is the cabinet's official address, and it is load bearing in
 * four places: the printed address on the contact plate, the footer `mailto:`, the
 * `email` in the JSON-LD, and the recipient the contact form posts to. See the FormSubmit
 * activation note in the README before launch.
 */
export const CONTACT = {
  phoneDisplay: '+216 70 621 342',
  phoneHref: 'tel:+21670621342',
  email: 'contact@best-bmc.com',
  addressLines: ['Imm. Galaxy D4', 'La Petite Ariana', 'Tunisie'],
} as const;
