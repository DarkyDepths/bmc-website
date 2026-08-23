# BMC — Best Management & Consulting

Showcase site for a Tunisian management-consulting cabinet, in French, English and Arabic.

Static, three locales, one page each. No CMS, no backend, no analytics, no cookies.

- **Brief:** [need.md](need.md)
- **Brand and voice:** [PRODUCT.md](PRODUCT.md)
- **Design system:** [DESIGN.md](DESIGN.md)

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 15, App Router, `output: 'export'` |
| Styling | Tailwind CSS v4, CSS-first `@theme` tokens in [globals.css](src/app/globals.css) |
| Motion | `motion` (Framer Motion 12) for the pinned track, Lenis for smooth scroll, CSS for everything else |
| Fonts | Self-hosted via `@fontsource`. Young Serif, Schibsted Grotesk, Amiri, Readex Pro |
| i18n | Hand-rolled: typed dictionaries plus `generateStaticParams` |
| Output | Plain HTML/CSS/JS in `out/`, deployable to any static host |

There is no runtime dependency on a server. `out/` can be dropped on Netlify, Vercel,
Cloudflare Pages, S3, or a shared cPanel host.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 forwards to /fr/
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Static export into `out/`, then writes the root and 404 shells |
| `npm run start` | Serves the built `out/` with `npx serve` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | `next lint` |

Node 20 or newer.

`next dev` prints **`Specified "redirects" will not automatically work with "output: export"`**
twice on startup. That is expected, not a misconfiguration. See
[Root, 404 and favicon](#root-404-and-favicon).

## Routes

```
/            locale negotiation, see below
/fr/         French   (default, source locale)
/en/         English
/ar/         Arabic   (dir="rtl")
/404.html    trilingual not-found
```

### Root, 404 and favicon

Every real page lives under a locale segment. `app/layout.tsx` is a deliberate pass-through
so that `app/[locale]/layout.tsx` can own `<html lang dir>` and give each locale the correct
document language and direction. The consequence is that any route resolving *outside* the
locale segment renders without a document wrapper. Three of them can, and each is handled
explicitly:

| Route | Handled by | Why |
| --- | --- | --- |
| `/` in the build | [scripts/static-shells.mjs](scripts/static-shells.mjs) writes `out/index.html` | Static export has no middleware, so locale negotiation happens client-side: `hreflang` alternates for crawlers, a `navigator.languages` match for browsers, `<meta http-equiv="refresh">` to `/fr/` for no-JS. |
| `/` in dev | a `redirects()` entry in [next.config.ts](next.config.ts) | Dev has no `out/index.html`. The redirect makes `/` resolve instead of falling through to the wrapper-less not-found page. `output: 'export'` ignores redirects, which is why the build keeps the smarter shell above and Next prints a notice about it. |
| `/404.html` | the same script | Next's generated 404 comes out without `<!doctype>`, `<html>` or `<body>` for the reason above, and it would be malformed on any host that serves it. The hand-written one is a valid document, offers all three locales rather than guessing, and ships no JavaScript. |
| `/favicon.ico` | [public/favicon.ico](public/favicon.ico) | A browser's implicit request for it would otherwise fall into the `[locale]` segment, which `generateStaticParams` does not contain, and 500 in dev. A real file short-circuits routing. |

If you deploy behind a host that can negotiate language server-side, prefer that and leave
`out/index.html` as the fallback. Point the host's 404 handler at `/404.html`.

## Structure

```
src/
  app/
    layout.tsx              pass-through, so [locale] can own <html lang dir>
    [locale]/layout.tsx     fonts, metadata, hreflang, header + rail + footer
    [locale]/page.tsx       JSON-LD, then the seven chapters in order
    globals.css             the whole design system
  components/
    sections/               one file per chapter
    layout/                 Header, Rail, Footer, Wordmark, LocaleSwitch, Veil
    visual/                 CoverChart, Seal
    ui/                     Action, ChapterHead, Reveal, Tally
    providers/              Reading (scroll position), SmoothScroll (Lenis)
  i18n/
    config.ts               locales, chapter ids, folios, contact details
    dictionaries.ts         locale -> dictionary
  messages/
    fr.ts                   source of truth, exports `Dict`
    en.ts  ar.ts            typed `const x: Dict`, so a missing key fails the build
  lib/
    trajectory.ts           the curve maths shared by the cover chart and the rail
    sendForm.ts             the FormSubmit relay, see The contact form below
    open.ts                 the gate everything that plays on arrival waits for
scripts/
  static-shells.mjs         writes out/index.html and out/404.html after the build
public/
  favicon.svg  favicon.ico
```

### Adding or changing copy

Edit [src/messages/fr.ts](src/messages/fr.ts) first. It is the only file that defines the
shape; `Dict` is derived from it. `en.ts` and `ar.ts` are annotated `const x: Dict`, so
adding a French key breaks the build until the other two are filled in. That is deliberate:
a half-translated page is worse than an untranslated one.

### Adding a locale

1. Add the code to `locales` and `localeMeta` in [src/i18n/config.ts](src/i18n/config.ts).
2. Add `src/messages/<code>.ts` typed as `Dict`.
3. Register it in [src/i18n/dictionaries.ts](src/i18n/dictionaries.ts).
4. If it needs a different script, import its faces in `src/app/[locale]/layout.tsx` and add
   a `:lang()` block in `globals.css` next to the Arabic one.

`generateStaticParams` and the root redirect pick the new locale up automatically.

## The contact form

The reply slip on the contact plate posts to [FormSubmit](https://formsubmit.co), a keyless
relay that emails the submission straight to `CONTACT.email`. No backend, no mail server,
no API key, no third-party script on the page. [src/lib/sendForm.ts](src/lib/sendForm.ts) is
the whole integration.

It degrades cleanly. The markup is a real `<form>` with a real `action`, so it still posts
without JavaScript and `_next` returns the reader to the contact chapter; with JavaScript
the submit is intercepted and relayed over `fetch`, so nobody leaves the page. FormSubmit's
`_honey` honeypot is included, and `_captcha` is off so a reader is never handed a puzzle.

> **This does not work until the recipient activates it.** The first submission to a new
> address triggers a one-time activation email from FormSubmit. Until someone at
> `CONTACT.email` opens it and clicks "Activate Form", every later submission is silently
> discarded. Do this once, from a real submission on the live domain, before launch, and
> confirm a test message arrives.

## Assumptions to confirm before launch

These are placeholders. They are the only invented values in the project.

| Where | Value | Note |
| --- | --- | --- |
| `CONTACT.email` in [src/i18n/config.ts](src/i18n/config.ts) | `contact@bmc-conseil.tn` | **Invented, and now load-bearing.** The brief gives no address. It is the printed address, the `mailto:` in the footer, the `email` in the JSON-LD, *and* the FormSubmit recipient. Replace it before launch or the contact form delivers nowhere. |
| `SITE_URL` in [src/i18n/config.ts](src/i18n/config.ts) | `https://www.bmc-conseil.tn` | **Invented.** Drives canonical URLs, `hreflang`, Open Graph, and the form's no-JS `_next` return address. Must match the real domain or the metadata is wrong. |
| Postal address | `Imm. Galaxy D4, La Petite Ariana, Tunisie` | From the brief, but no street or postcode. Worth completing for local search. |
| Reply time | "sous 48 heures ouvrées" / "within two working days" | In `contact.form.sent` in all three message files. A promise the cabinet has to be able to keep. Change it if two days is wrong. |

Everything else comes from [need.md](need.md). No metric on this site is invented: the
figures are 15+ years, 08 expertises, 10 sectors, 05 method phases, and all four are stated
in the brief. The cover chart is explicitly captioned as a diagram of the method and not as
client data, in all three languages. Keep it that way unless the client supplies figures
they can defend.

There is no Open Graph image yet, which is why the Twitter card is `summary` rather than
`summary_large_image`. Add a 1200x630 PNG at `public/og.png`, point `openGraph.images` at it
in `generateMetadata`, and switch the card type at the same time.

## The cover sheet

The site opens on a paper-coloured sheet carrying the animated mark, which lifts once the
fonts are ready. [src/components/layout/Veil.tsx](src/components/layout/Veil.tsx) holds the
timing constants and the reasoning; [DESIGN.md](DESIGN.md) covers why it looks the way it
does. Three things worth knowing before you touch it:

- **It never gates content.** The page renders underneath from the first paint. The sheet
  is an overlay, not a substitute, so a bug in it can hide the site but never prevent it
  from existing. Crawlers get the full prerendered document either way.
- **It is decided before first paint.** Whether it appears at all (first visit this
  session, motion allowed, JavaScript running) is settled by the inline script in
  `[locale]/layout.tsx` that stamps `data-veil` on `<html>`. Nothing about it is decided in
  an effect, so nothing about it flashes.
- **Anything that plays on arrival must wait for it.** Use `whenOpen()` from
  [src/lib/open.ts](src/lib/open.ts) rather than starting an observer on mount, or your
  animation will finish behind the sheet. `Reveal`, `Tally` and `SmoothScroll` all do. The
  cover chart is held at its first frame in CSS instead, via `animation-play-state`.

To turn it off entirely: drop `<Veil />` from the layout. Nothing else depends on it,
because `whenOpen()` runs immediately when there is no veil.

## Accessibility and performance notes

- Every chapter is reachable by keyboard: skip link, focusable rail nodes with visible
  labels on focus, accordion triggers with `aria-expanded` / `aria-controls`, and collapsed
  panels marked `inert` so they leave the tab order and the accessibility tree.
- Contrast is verified, not assumed. Every foreground/background pair in the build is at or
  above 4.5:1. The ratios are recorded in [DESIGN.md](DESIGN.md). Do not adjust a lightness
  value without re-checking.
- `prefers-reduced-motion: reduce` is a hard stop, not a slowdown: no cover sheet at all,
  Lenis torn down live, the cover chart renders its final frame, the methodology becomes a
  vertical stack, the figures show their final value, reveals become instant. Nothing on
  the site depends on motion to be understood.
- Scrolling is held while the cover sheet is up, and `overflow: hidden` is not what does
  it: Lenis turns a wheel event into a programmatic scroll, which is exactly what
  `overflow: hidden` still permits. `SmoothScroll` calls `lenis.stop()` and releases on the
  lift. A URL fragment is still honoured, because that scroll is set once rather than
  driven by the wheel.
- The cover chart is a server component. It draws itself with CSS `stroke-dashoffset` and
  ships no JavaScript.
- First Load JS is about 150 kB. Most of it is the pinned methodology track. If that budget
  ever matters more than the effect, the track and its dependency on `motion` are the first
  things to cut; the CSS stack fallback already exists and is what phones get.

## What to do next

1. Replace the two placeholder values above.
2. Add the Open Graph image.
3. Get a real photograph of the office or the team if the client ever wants one. The site is
   designed to work without photography, so an image has to be good enough to earn its
   place, not just fill a gap.
4. Consider a short "références" chapter if the client can name clients on the record. It is
   the one thing a credibility site of this kind is missing, and the brief does not provide
   it.
