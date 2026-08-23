import { Mark } from '@/components/layout/Wordmark';
import { cn } from '@/lib/cn';

/**
 * The closing mark. A memorandum ends stamped, so the page does too. Drawn once, at the
 * foot of the contact chapter, and never repeated.
 */
export function Seal({ caption, className }: { caption: string; className?: string }) {
  const ring = 'var(--color-wine-bright)';

  return (
    <div className={cn('relative grid h-[132px] w-[132px] place-items-center', className)}>
      <svg
        viewBox="0 0 132 132"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Starts at six o'clock and runs clockwise, so the halfway mark of the path
              is the top of the ring. That is the anchor the caption centres on. */}
          <path
            id="bmc-seal-arc"
            d="M66 66 m 0 50 a 50 50 0 1 1 0 -100 a 50 50 0 1 1 0 100"
            fill="none"
          />
        </defs>

        <circle cx="66" cy="66" r="63" fill="none" stroke={ring} strokeWidth="1" opacity="0.55" />
        <circle cx="66" cy="66" r="57" fill="none" stroke={ring} strokeWidth="1" opacity="0.3" />

        {/* Centred on the top of the ring rather than started at the head of the path.
            A caption laid out from `startOffset="1%"` runs off the beginning of the path
            and disappears the moment the document direction is RTL. The isolation keeps
            the registered name in Latin order on the Arabic page. */}
        <text
          textAnchor="middle"
          fill={ring}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '7.6px',
            fontWeight: 500,
            letterSpacing: '0.235em',
            textTransform: 'uppercase',
            direction: 'ltr',
            unicodeBidi: 'isolate',
          }}
        >
          <textPath href="#bmc-seal-arc" startOffset="50%">
            {caption}
          </textPath>
        </text>
      </svg>

      <Mark className="h-9 w-9" tone="bone" />
    </div>
  );
}
