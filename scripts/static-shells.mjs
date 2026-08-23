/**
 * Writes the two HTML files that `next build` cannot produce correctly for this site.
 * Runs after `next build`, see package.json.
 *
 *   out/index.html   the bare domain
 *   out/404.html     anything that does not resolve
 *
 * Both exist for the same reason: every real page of this site lives under a locale
 * segment (/fr/, /en/, /ar/), and these two do not. With `output: 'export'` there is no
 * middleware to negotiate a locale, and the root layout is a pass-through so that
 * `[locale]/layout.tsx` can own `<html lang dir>` per locale, which means Next's generated
 * 404 comes out without a document wrapper. Writing both by hand is exact, dependency-free
 * and ships no JavaScript for a page whose only job is to point somewhere else.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'out');
const LOCALES = ['fr', 'en', 'ar'];
const DEFAULT_LOCALE = 'fr';

/* The palette, inlined. These shells must not depend on a hashed stylesheet. */
const CSS = `
  :root { color-scheme: light; }
  html { background: #f5f2ec; color: #142121; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem clamp(1.25rem, 5vw, 4rem);
    font: 400 1.0625rem/1.65 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .sheet { width: 100%; max-width: 34rem; }
  .folio {
    font-variant-numeric: tabular-nums;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #96324c;
    margin: 0 0 0.75rem;
  }
  h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 400;
    font-size: clamp(1.75rem, 1.2rem + 2.2vw, 2.5rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 1.5rem;
  }
  hr { border: 0; border-top: 1px solid #c7d2d1; margin: 0 0 2rem; }
  ul { list-style: none; margin: 0; padding: 0; }
  li + li { margin-top: 0.25rem; }
  a {
    display: flex;
    align-items: baseline;
    gap: 1.25rem;
    padding: 0.875rem 0;
    border-bottom: 1px solid #c7d2d1;
    color: #142121;
    text-decoration: none;
  }
  a:hover { background: #eeeae2; }
  a:focus-visible { outline: 2px solid #96324c; outline-offset: 3px; }
  .tag {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    color: #96324c;
    min-width: 2.25rem;
  }
  .go { margin-inline-start: auto; color: #5f6a69; }
  [dir="rtl"] .go { transform: scaleX(-1); }
  strong { font-weight: 500; }
  p { color: #495555; }
  :lang(ar) { letter-spacing: 0; }
`;

const head = (title, extra = '') => `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
${extra}<style>${CSS}</style>`;

/* ---------------------------------------------------------------- root ---
   Three ways of forwarding, so it works everywhere: hreflang for crawlers, a
   `navigator.languages` match for browsers, and a meta refresh for no-JS clients. */
const rootHtml = `<!doctype html>
<html lang="${DEFAULT_LOCALE}">
<head>
${head(
  'Best Management &amp; Consulting',
  `${LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="/${l}/">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="/${DEFAULT_LOCALE}/">
<meta http-equiv="refresh" content="0; url=/${DEFAULT_LOCALE}/">
`,
)}
</head>
<body>
<p>Redirection vers <a href="/${DEFAULT_LOCALE}/">Best Management &amp; Consulting</a>.</p>
<script>
(function () {
  var supported = ${JSON.stringify(LOCALES)};
  var fallback = ${JSON.stringify(DEFAULT_LOCALE)};
  var wanted = (navigator.languages && navigator.languages.length)
    ? navigator.languages
    : [navigator.language || fallback];
  var pick = fallback;
  outer: for (var i = 0; i < wanted.length; i++) {
    var tag = String(wanted[i]).toLowerCase().split('-')[0];
    for (var j = 0; j < supported.length; j++) {
      if (supported[j] === tag) { pick = supported[j]; break outer; }
    }
  }
  location.replace('/' + pick + '/');
})();
</script>
</body>
</html>
`;

/* ----------------------------------------------------------------- 404 ---
   Trilingual, because a broken link can arrive from any of the three sites, and
   guessing the reader's language on an error page is how you compound the error. */
const NOT_FOUND = [
  {
    locale: 'fr',
    dir: 'ltr',
    title: 'Page introuvable',
    body: 'Cette adresse ne correspond à aucune page. Revenir au site.',
  },
  {
    locale: 'en',
    dir: 'ltr',
    title: 'Page not found',
    body: 'This address does not match any page. Return to the site.',
  },
  {
    locale: 'ar',
    dir: 'rtl',
    title: 'الصفحة غير موجودة',
    body: 'هذا العنوان لا يقابل أي صفحة. العودة إلى الموقع.',
  },
];

const notFoundHtml = `<!doctype html>
<html lang="${DEFAULT_LOCALE}">
<head>
${head('404 &middot; Best Management &amp; Consulting')}
</head>
<body>
<main class="sheet">
<p class="folio">404</p>
<h1 lang="fr">Page introuvable</h1>
<hr>
<ul>
${NOT_FOUND.map(
  ({ locale, dir, title, body }) => `<li>
<a href="/${locale}/" lang="${locale}" dir="${dir}" hreflang="${locale}">
<span class="tag">${locale.toUpperCase()}</span>
<span><strong>${title}.</strong> ${body}</span>
<span class="go" aria-hidden="true">&#8594;</span>
</a>
</li>`,
).join('\n')}
</ul>
</main>
</body>
</html>
`;

await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, 'index.html'), rootHtml, 'utf8');

/* Next emits both spellings; hosts disagree about which one they serve. */
await writeFile(join(OUT, '404.html'), notFoundHtml, 'utf8');
await mkdir(join(OUT, '404'), { recursive: true });
await writeFile(join(OUT, '404', 'index.html'), notFoundHtml, 'utf8');

console.log(
  `static-shells: wrote out/index.html and out/404.html ` +
    `(default "${DEFAULT_LOCALE}", locales: ${LOCALES.join(', ')})`,
);
