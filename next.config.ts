import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Static export. The whole site is prerendered to plain HTML in `out/`, so it can be
   * dropped on any host (Vercel, Netlify, or the client's own shared hosting) with no
   * Node runtime. `trailingSlash` makes every route a real directory with an index.html,
   * which is what Apache and nginx resolve without extra rewrite rules.
   */
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,

  /**
   * Dev only, and deliberately so.
   *
   * Every real page lives under a locale segment, so a bare `/` matches nothing and dev
   * falls through to Next's generated not-found. That page renders outside
   * `[locale]/layout.tsx`, which is the layout that owns `<html lang dir>`, so it trips the
   * "missing root layout tags" overlay. Forwarding `/` to the default locale means the
   * route never resolves and the overlay never fires.
   *
   * `output: 'export'` ignores redirects, which is the point: the built site gets a real
   * `out/index.html` from `scripts/static-shells.mjs` that negotiates the locale properly
   * instead of hard-coding French. Next prints a notice about this at build time.
   */
  async redirects() {
    return [{ source: '/', destination: '/fr/', permanent: false }];
  },
};

export default nextConfig;
