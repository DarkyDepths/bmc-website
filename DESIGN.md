# DESIGN.md — BMC design system

Aesthetic lane: **the bound information memorandum.** Ivory stock, deep pine ink, a
bordeaux seal, numbered exhibits, hairline rules, tabular figures.

Theme: **light.** Scene sentence: *a bank's credit officer, at a desk, in daylight,
holding a printed file and deciding whether to fund it.* That forces light. This is a
document you read under an office window, not a viewport you stare into at 2am. Light also
lets the full-bleed pine plates read as inserted colour plates in a printed report, which
is where the drama lives.

## Colour

Strategy: **Committed.** Pine is load-bearing, not an accent. Across a full scroll it
carries roughly 35 to 45 percent of surface as full-bleed plates that alternate with ivory
document pages. Wine is the signal and stays under 8 percent: the curve, the seal, key
figures, primary actions, focus rings.

Named reference: a French *note d'information* printed on ivory stock, pine ink, one
bordeaux stamp. Deliberately not navy-and-gold, which is the category reflex for finance.

All values OKLCH. No `#000`, no `#fff`. Neutrals in the paper world are tinted warm
(hue 84 to 90); neutrals in the pine world are tinted toward the brand hue (hue 188 to 195).

| Token           | OKLCH                     | sRGB      | Role                                     |
| --------------- | ------------------------- | --------- | ---------------------------------------- |
| `--paper`       | `oklch(0.962 0.009 88)`   | `#f5f2ec` | Page canvas, ivory stock                 |
| `--paper-2`     | `oklch(0.938 0.011 86)`   | `#eeeae2` | Inset bands, table zebra                 |
| `--paper-3`     | `oklch(0.902 0.013 84)`   | `#e3ded5` | Pressed / active paper state             |
| `--rule`        | `oklch(0.855 0.012 188)`  | `#c7d2d1` | Hairline rules                           |
| `--rule-2`      | `oklch(0.760 0.014 189)`  | `#a8b4b3` | Stronger dividers, chart gridlines       |
| `--ink`         | `oklch(0.235 0.018 195)`  | `#142121` | Primary text                             |
| `--ink-2`       | `oklch(0.440 0.016 193)`  | `#495555` | Secondary text                           |
| `--ink-3`       | `oklch(0.518 0.015 192)`  | `#5f6a69` | Labels, captions, folios                 |
| `--pine-deep`   | `oklch(0.235 0.042 195)`  | `#002424` | Deepest plate, footer                    |
| `--pine`        | `oklch(0.312 0.048 194)`  | `#093838` | Standard plate surface                   |
| `--pine-raise`  | `oklch(0.378 0.050 193)`  | `#1c4a49` | Hover / raised on plate                  |
| `--pine-line`   | `oklch(0.450 0.040 192)`  | `#3a5d5b` | Hairlines on plate                       |
| `--pine-ink`    | `oklch(0.360 0.055 193)`  | `#0f4645` | Pine used as text on paper               |
| `--bone`        | `oklch(0.955 0.010 90)`   | `#f3f0e9` | Primary text on plate                    |
| `--bone-2`      | `oklch(0.800 0.012 92)`   | `#c0beb5` | Secondary text on plate                  |
| `--bone-3`      | `oklch(0.660 0.014 94)`   | `#959289` | Labels on plate                          |
| `--wine`        | `oklch(0.470 0.135 8)`    | `#96324c` | The signal, on paper                     |
| `--wine-deep`   | `oklch(0.395 0.120 7)`    | `#78223b` | Pressed signal                           |
| `--wine-bright` | `oklch(0.705 0.140 18)`   | `#ea797f` | The signal, on plate                     |

Every foreground/background pair used in the build is contrast-verified. Body text on
paper is 14.85:1, labels 4.94:1, wine on paper 6.59:1, bone on pine 11.23:1, wine-bright
on pine 4.58:1. No pair in the system falls below 4.5:1 for text.

## Typography

Three families. None is a reflex default, and there is deliberately **no monospace**: BMC
is not a technical brand, and mono would read as costume. Figures are set in the body face
with `font-variant-numeric: tabular-nums`, which is what a printed memorandum actually does.

- **Display — `Young Serif`.** A flared, inscriptional serif with a single weight and
  heavy stems. It reads as carved rather than literary, which suits a cabinet's nameplate
  and keeps the site out of magazine territory. Used for the cover line, chapter headings,
  expertise names and figures.
- **Body and UI — `Schibsted Grotesk` (variable).** Commissioned for a news organisation,
  so it holds up from 11px captions to 40px subheads, has full Latin Extended for French
  accents, and stays neutral next to a loud display face.
- **Arabic — `Amiri` for display, `Readex Pro` (variable) for body and UI.** Amiri is a
  revival of the Bulaq Press Naskh, the face of institutional Arabic printing, so it is the
  exact counterpart to an inscriptional Latin serif. Arabic is typeset, never a flipped
  Latin face.

Scale: fluid `clamp()`, modular ratio about 1.3. Display tracking runs tight
(`-0.02em` to `-0.035em`) because Young Serif sets loose by default. Body line-height 1.65,
`.measure` capped at 68ch and `.measure-tight` at 54ch.

`--text-mega`, the cover line, is the one step bounded by height as well as width:
`clamp(2.6rem, min(1.05rem + 6.2vw, 0.5rem + 9vh), 5.9rem)`. It is the only type on the
site that has to share a fold with a lede and two actions, and on a 1280x720 laptop the
`vh` term wins and hands the page back about 70px.

Arabic is not a font swap alone. Under `:lang(ar)` the label tracking drops to zero so
Naskh joins correctly, headings relax to `line-height: 1.32` and body to `1.85`, because
Arabic needs the room that a tight Latin measure denies it.

## Spacing and rhythm

8px base. Chapter separation is fluid: `--chapter-gap: clamp(5.5rem, 11vh, 9.5rem)`. Rhythm
is deliberately uneven, tight label-to-heading groupings against generous chapter breaks, so
the page reads as a set of pages rather than a uniform stack.

Layout runs on a named 12-column grid with a persistent margin column reserved for the
trajectory rail on the left in LTR and mirrored in RTL. All spacing and positioning use
logical properties (`ps`/`pe`, `ms`/`me`, `start`/`end`, `text-start`) so Arabic mirrors
without a second stylesheet.

## Components

- **Actions.** Primary is a wine fill with a 2px radius and a rule that extends on hover.
  Secondary is a hairline ghost that fills pine on hover. Focus-visible is a 2px wine ring
  offset 3px. Never a pill, never a gradient, never a shadow.
- **Chapter head.** A folio (`01 / 06`), a tracked uppercase label, a hairline that runs to
  the end of the grid, then the display heading. Start-aligned.
- **Index rows.** Expertises are set as an index, not a card grid: a numbered row, a display
  name, a one-line summary, a plus that becomes a minus, and a rule. One row open at a time.
  Hover fills the row and draws a wine rule across it. Sectors use the same logic reduced to
  an annex table (`<dl>`, sector against focus). There are no repeated icon cards anywhere
  on this site.
- **Exhibits.** Figures are a ruled exhibit at the foot of the cover: a tracked label above
  the rule, then label-over-figure in tabular display numerals, divided by hairlines. Label
  above figure, not the SaaS stat-tile order. One column on a phone, three from `sm` up.
  Never three gradient stat tiles.
- **Plates.** Full-bleed pine sections that break the ivory: the pinned methodology track,
  the contact chapter, and the footer on `--pine-deep`. A plate re-points `--signal`,
  `--hairline`, `--focus` and `--text-2` so its children never need to know which world they
  are in. Pourquoi sits on an inset `--paper-2` band; Secteurs stays on paper.
- **Reply slip.** The contact form is set as a printed form is set: a tracked label over a
  ruled line, no boxes, no fills, no placeholder text standing in for a label. The rule
  under each field is the same hairline as the rest of the plate and takes the signal
  colour on focus, so the affordance is the document's own vocabulary rather than an input
  widget borrowed from a product UI. Its submit is the same `Action` object as every other
  button on the site, not a second, slightly different one.
- **Seal.** A double `--wine-bright` ring with the mark at its centre and the registered name
  running along the top of the arc. Drawn once, on the contact plate, and never repeated. The
  caption is Latin in all three locales: it is a stamp of the registered entity, and the
  letter-spacing the ring depends on would break Arabic joins.

Elevation is expressed with rules and surface changes only. There are no drop shadows in
this system.

## Motion

- Easing: ease-out exponential, `cubic-bezier(0.16, 1, 0.3, 1)`. No bounce, no elastic, no
  spring overshoot.
- Smooth scroll via Lenis when motion is allowed.
- Reveals are short, staggered, once on enter: 14px translate plus opacity, 620ms.
- **The cover sheet.** A bound document is closed before it is read, so the site opens
  closed: a paper-coloured sheet carrying the mark, which is a histogram, building itself.
  The three bars rise in order, the wine one last because it is the one that breaks the
  frame, they hold, they drop, and it repeats for as long as the wait lasts. Then the sheet
  lifts off the top of the page and the document is open. It is paper, not pine, so the
  lift is a dissolve into the cover rather than a slam from dark to light.

  It never gates content: the page is fully rendered underneath from the first paint. Two
  gates have to open before it lifts, and the slower one sets the pace. The fonts have to
  be in, because a display serif swapping in under the reader is the thing worth hiding,
  capped at 2000ms so a slow face cannot hold the sheet up. And the bars have to have
  climbed twice, counted on the animation's own clock rather than a wall clock, because the
  two do not start together: the CSS animation begins when the sheet is painted, some way
  after navigation, so only `animationiteration` knows which climb the reader is actually
  watching. The lift is then offset to the crest of that second climb, the window where all
  three bars are standing, so the last thing seen under the sheet is a finished histogram
  rather than a collapsing one. In practice it runs about two seconds.

  It shows once a session, never under reduced motion, and never without JavaScript. Those
  three are decided by the inline script before first paint, so nothing flashes. A hard
  ceiling opens the document regardless if the animation never runs at all, which is what
  a backgrounded tab does.

  Everything that plays once on arrival waits for the lift rather than for its own observer
  (`src/lib/open.ts`): the chart is held at its first frame with `animation-play-state`, and
  the reveals and the counting figures do not start observing until the sheet is gone.
  Otherwise the whole cover would perform behind an opaque sheet and the reader would lift
  it onto a page that had already finished.
- Two large moments after that. The cover chart draws its curve. The methodology becomes
  a horizontally pinned track driven by scroll. Everything else is restrained: rule
  extensions, row fills, the rail node advancing.
- The cover figures count up once, when the exhibit first comes into view, on the same
  ease-out-expo curve. The printed value is what the server renders and what sits in the
  DOM beforehand, so the exhibit is correct without JavaScript, in a crawler, and under
  reduced motion. The animation is an enhancement on a value that is already right, never
  the thing that produces it.
- **Reduced motion:** no cover sheet at all, Lenis off, the chart renders its final frame
  with no draw animation, the methodology becomes a plain vertical stack, the figures show
  their final value, and reveals become instant. Nothing on this site depends on motion to
  be understood.

## The signature visual — La Trajectoire

One idea, expressed twice.

**On the cover**, a plotted performance curve. Ivory ground, hairline gridlines, a baseline
tick-labelled with the five method phases, and a wine curve that draws from origin to peak
on load, with each phase node landing in sequence. It is labelled as a diagram, not as
data, because BMC has no published figures and the site invents none.

**Down the page**, the same curve becomes a fixed rail in the margin, 68px wide inside a
`6.75rem` reserved column: a miniature of the whole trajectory with one node per chapter,
closed by a tick at the foot of the axis so it reads as plotted rather than as a stray
thread. The traversed segment is drawn in wine, the current node is filled, and the nodes
are real navigation. It is progress, position and table of contents in one object, and it
is the reason the site feels bound rather than scrolled.

The rail is fixed, so it cannot see what is behind it. It reads `PLATE_CHAPTERS` and swaps
`--rail-line`, `--rail-signal` and `--rail-dot` over 620ms when the chapter under it is a
pine plate. On the methodology track, which slides sideways underneath it, the leading edge
of the track is masked to transparent across the rail column so panels leave the frame by
dissolving rather than by colliding with the rail mid-word.

The curve is convex, slow then steep, because that is what compounding advisory work
actually looks like and because it echoes the rising arrow in the client's logo.

Implementation is plain SVG with a Catmull-Rom path and `stroke-dashoffset`. No WebGL, no
canvas, no animation library driving geometry. Two elements, both under 3KB.

## Responsive and RTL

- Designed mobile-first. Display type scales via `clamp()`; the 12-column grid collapses to
  a 4-column one at `md` and to a single column below it, with the rhythm preserved.
- The trajectory rail needs both width and height to earn its place: it appears only at
  `min-width: 1024px` and `min-height: 700px`. Everywhere else the 2px wine progress rule
  under the header carries the same information without stealing layout.
- The methodology track becomes a vertical stack below `lg` and under reduced motion. The
  switch is pure CSS (`.method-track` / `.method-stack`), so there is no client-side branch
  and no hydration mismatch.
- `dir="rtl"` for Arabic, set on `<html>` from the route segment. The rail moves to the
  right edge, the layout mirrors through logical properties, chapter folios are isolated
  LTR, and the phone number and email are forced LTR with a `.ltr` utility.
- **The cover chart is never mirrored.** A chart axis is a mathematical convention, and
  Arabic financial reporting draws it left to right like everyone else. Mirroring it
  produces a line that falls across the page, which reads as decline no matter which way
  the words run. Only the phase labels underneath follow the text direction.
