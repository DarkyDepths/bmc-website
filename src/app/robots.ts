import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/i18n/config';

/**
 * Emitted as a real `out/robots.txt` at build. Without it the path falls through to the
 * `[locale]` segment, which is the one thing on this site that matches everything.
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
