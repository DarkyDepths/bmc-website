'use client';

import { useReading } from '@/components/providers/Reading';
import {
  CHAPTERS,
  CHAPTER_TOTAL,
  folio,
  PLATE_CHAPTERS,
  type ChapterId,
} from '@/i18n/config';
import { buildRail, RAIL } from '@/lib/trajectory';

type RailProps = {
  labels: Record<ChapterId, string>;
  navLabel: string;
  hint: string;
  rtl?: boolean;
};

/**
 * La Trajectoire, in the margin.
 *
 * The same curve as the cover, rotated a quarter turn: reading runs down the rail and the
 * line swings toward the outer edge as the document advances. The traversed length is drawn
 * in wine from real scroll progress, and every node is a link, so this is table of contents,
 * progress bar and position marker in one object.
 *
 * It also re-tones itself when the chapter behind it is a pine plate, because a fixed
 * element that ignores its background is how these things end up invisible.
 */
export function Rail({ labels, navLabel, hint, rtl = false }: RailProps) {
  const { activeIndex, progress, active } = useReading();
  const rail = buildRail(CHAPTERS.length);
  const last = rail.nodes[rail.nodes.length - 1];

  return (
    <nav
      aria-label={navLabel}
      data-tone={PLATE_CHAPTERS.has(active) ? 'plate' : 'paper'}
      className="rail fixed top-1/2 z-30 -translate-y-1/2"
      style={{ insetInlineStart: `calc((var(--rail-w) - ${RAIL.width}px) / 2)` }}
    >
      <div className="relative" style={{ width: RAIL.width, height: RAIL.height }}>
        <svg
          viewBox={`0 0 ${RAIL.width} ${RAIL.height}`}
          width={RAIL.width}
          height={RAIL.height}
          className="absolute inset-0 overflow-visible"
          aria-hidden="true"
          focusable="false"
          style={rtl ? { transform: 'scaleX(-1)' } : undefined}
        >
          {/* Axis foot, so the curve reads as plotted rather than as a stray thread. */}
          <line
            x1={last.x - 9}
            x2={last.x + 9}
            y1={last.y + 12}
            y2={last.y + 12}
            stroke="var(--rail-line)"
            strokeWidth="1"
          />

          <path
            d={rail.path}
            fill="none"
            stroke="var(--rail-line)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d={rail.path}
            pathLength={1}
            fill="none"
            stroke="var(--rail-signal)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={1 - progress}
          />
        </svg>

        <ol className="absolute inset-0 m-0 list-none p-0">
          {CHAPTERS.map((id, index) => {
            const node = rail.nodes[index];
            const state =
              index === activeIndex ? 'active' : index < activeIndex ? 'done' : 'ahead';

            return (
              <li
                key={id}
                className="absolute"
                style={{
                  insetInlineStart: node.x,
                  top: node.y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <a
                  href={`#${id}`}
                  data-state={state}
                  aria-current={state === 'active' ? 'true' : undefined}
                  className="rail-node group grid h-7 w-7 place-items-center rounded-full"
                >
                  <span aria-hidden="true" className="rail-dot" />

                  {/* Name appears on hover or keyboard focus, over the content column. */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap
                      rounded-xs bg-pine px-2.5 py-1 text-[0.6875rem] font-medium tracking-[0.06em]
                      text-bone opacity-0 transition-opacity duration-300 ease-out-expo
                      group-hover:opacity-100 group-focus-visible:opacity-100
                    "
                    style={{ insetInlineStart: 'calc(100% + 4px)' }}
                  >
                    {labels[id]}
                  </span>
                  <span className="sr-only">{labels[id]}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-7 text-center">
        <span
          className="label folio block"
          style={{ color: 'var(--rail-signal)', transition: 'color 620ms var(--ease-out-expo)' }}
        >
          {folio(active)}
          <span className="opacity-45">/{String(CHAPTER_TOTAL).padStart(2, '0')}</span>
        </span>
        <span className="sr-only">{hint}</span>
      </p>
    </nav>
  );
}
