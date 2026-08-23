'use client';

import { useEffect, useRef, useState } from 'react';

import { OPEN_EVENT } from '@/lib/open';

/**
 * The cover sheet.
 *
 * A bound document is closed before it is read, and the mark is a histogram, so the wait
 * is the mark building itself: the three bars rise in order, the wine one last because it
 * is the one that breaks the frame, they hold, they drop, and it repeats. It runs at least
 * twice, and the sheet lifts on a frame where the mark is whole. Then the document is open.
 *
 * The rules it lives by, because a loading screen that gets any of these wrong is worse
 * than no loading screen at all:
 *
 *   - It never gates content. The page is fully rendered underneath from the first paint;
 *     this is a sheet over a finished document, not a substitute for one.
 *   - It waits for the fonts, not for a fixed number. `document.fonts.ready` is the real
 *     signal, since a display serif swapping in under the reader is the thing worth hiding.
 *   - It is bounded. Never so brief the animation is missed, never long enough to become a
 *     toll booth, and never able to hang.
 *   - Once a session. Coming back to the page inside the same visit goes straight in.
 *   - Under reduced motion it does not appear at all.
 *   - Without JavaScript it does not appear at all, so a failed bundle can never leave a
 *     reader staring at a sheet that will not lift.
 *
 * The last three are decided by the inline script in the layout, before first paint, so
 * there is nothing to flash.
 */

/** How many times the bars climb before the sheet is allowed to lift. */
const CYCLES = 2;

/**
 * Where inside the final cycle to lift, measured from that cycle's start.
 *
 * The pacing is anchored to the animation's own clock rather than to a wall clock, because
 * the two do not start together: the CSS animation begins when the sheet is first painted,
 * which is some way after navigation. Counting `animationiteration` on the first bar is the
 * only way to know which climb the reader is actually watching.
 *
 * Within a 1150ms cycle the third bar tops out at ~590ms and the first starts falling at
 * ~735ms. Anywhere in that window all three are standing, so the last thing seen under the
 * sheet is a finished histogram rather than a collapsing one.
 */
const CREST_MS = 620;

/** Caps how long the fonts get, so a slow face cannot hold the sheet up. */
const FONT_MS = 2000;

/** Hard stop. Nothing above may keep the sheet on screen past this, whatever happens. */
const CEILING_MS = 3600;

/** Matches the lift transition in globals.css. */
const LIFT_MS = 620;

export function Veil() {
  const first = useRef<SVGRectElement>(null);
  const [lifting, setLifting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.veil !== 'on') {
      setGone(true);
      return;
    }

    let remove = 0;
    let ceiling = 0;
    let crest = 0;
    let done = false;

    const bar = first.current;

    const open = () => {
      if (done) return;
      done = true;

      setLifting(true);

      /* Becomes 'lifting', not 'off'. The stylesheet keeps the sheet displayed for both,
         so the transition has something to play on; flipping straight to 'off' pulls the
         display rule out from under it and the sheet vanishes instead of lifting. */
      root.dataset.veil = 'lifting';

      /* Fired at the start of the lift, not the end, so the cover performs as the sheet
         dissolves off it rather than after. The chart is released by the same attribute
         change, in CSS. */
      window.dispatchEvent(new Event(OPEN_EVENT));

      window.clearTimeout(ceiling);
      window.clearTimeout(crest);
      bar?.removeEventListener('animationiteration', onIteration);

      remove = window.setTimeout(() => {
        root.dataset.veil = 'off';
        setGone(true);
      }, LIFT_MS);
    };

    /* Two gates, both of which must open: the fonts have to be in, and the bars have to
       have climbed. Whichever is slower sets the pace. */
    let fontsIn = false;
    let climbed = false;
    const maybeOpen = () => {
      if (fontsIn && climbed) open();
    };

    function onIteration() {
      /* Fires at the end of each cycle. After CYCLES - 1 of them the reader has watched
         one full climb and is inside the next, so waiting out the crest of that one gives
         the requested count and a whole mark to leave on. */
      if (--pending > 0) return;
      bar?.removeEventListener('animationiteration', onIteration);
      crest = window.setTimeout(() => {
        climbed = true;
        maybeOpen();
      }, CREST_MS);
    }

    let pending = Math.max(1, CYCLES - 1);

    if (bar) {
      bar.addEventListener('animationiteration', onIteration);
    } else {
      climbed = true;
    }

    Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((resolve) => window.setTimeout(resolve, FONT_MS)),
    ]).then(() => {
      fontsIn = true;
      maybeOpen();
    });

    /* If the animation never runs, or the tab was backgrounded so no iteration ever
       fired, this is what still opens the document. */
    ceiling = window.setTimeout(open, CEILING_MS);

    try {
      sessionStorage.setItem('bmc-opened', '1');
    } catch {
      /* Private mode, or site data blocked. The veil simply shows again next time. */
    }

    return () => {
      bar?.removeEventListener('animationiteration', onIteration);
      window.clearTimeout(remove);
      window.clearTimeout(ceiling);
      window.clearTimeout(crest);
    };
  }, []);

  if (gone) return null;

  return (
    <div className="veil" data-lifting={lifting || undefined} aria-hidden="true">
      <svg
        viewBox="0 0 26 26"
        className="veil-mark"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* The frame holds still. Only the ascent moves. */}
        <path
          d="M4 3.5V22H22"
          stroke="var(--color-pine-ink)"
          strokeWidth="1.4"
          strokeLinecap="square"
        />
        <rect
          ref={first}
          className="veil-bar"
          x="7.6"
          y="15.4"
          width="3.2"
          height="6.6"
          fill="var(--color-pine)"
        />
        <rect className="veil-bar" x="12.6" y="11" width="3.2" height="11" fill="var(--color-pine)" />
        {/* Overshoots the frame, and lands last. */}
        <rect
          className="veil-bar"
          x="17.6"
          y="4.2"
          width="3.2"
          height="17.8"
          fill="var(--color-wine)"
        />
      </svg>
    </div>
  );
}
