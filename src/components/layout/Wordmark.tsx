import { cn } from '@/lib/cn';

/**
 * The client's own logo, at its intrinsic pixel size. Declared so the header reserves the
 * right box before the image decodes and nothing shifts.
 */
const LOGO = { width: 711, height: 414 };

type WordmarkProps = {
  /** Accessible name for the logo itself. Ignored when `name` is present. */
  label: string;
  /** The registered name, set beside the logo. Omit for the logo alone. */
  name?: string;
  className?: string;
  logoClassName?: string;
  tone?: 'ink' | 'bone';
};

/**
 * The client's logo, optionally locked up with the registered name.
 *
 * The logo is the whole device already, letters and frame and rising arrow together, but
 * "BmC" alone tells a first-time reader nothing, so the name is set beside it the way a
 * letterhead does it: a hairline rule, then the name in the body face, tracked and quiet.
 * The logo is the loud object in this pairing and the name must not compete with it.
 *
 * Two files, one artwork. The supplied original is a small JPEG on a white ground with a
 * grey drop shadow baked into it, which reads as a bright halo the moment it crosses a
 * pine plate. Both files are rebuilt from it: the ground and its shadow removed, every
 * region flattened to the logo's own sampled colours, and for `bone` the same forms lifted
 * in place so each element separates from a dark plate. Same shapes, same hues, same
 * arrangement. See README for the request for the original vector.
 */
export function Wordmark({
  label,
  name,
  className,
  logoClassName,
  tone = 'ink',
}: WordmarkProps) {
  const image = (
    <img
      src={tone === 'bone' ? '/bmc-logo-light.png' : '/bmc-logo.png'}
      /* When the name is set beside it the logo is decoration: the text carries the
         accessible name, and announcing both would read it twice. */
      alt={name ? '' : label}
      width={LOGO.width}
      height={LOGO.height}
      decoding="async"
      className={cn('block h-10 w-auto', logoClassName)}
    />
  );

  if (!name) return <span className={cn('inline-flex', className)}>{image}</span>;

  return (
    <span className={cn('inline-flex items-center gap-3 sm:gap-4', className)}>
      {image}

      <span
        aria-hidden="true"
        className="hidden h-9 w-px shrink-0 bg-[color:var(--hairline)] sm:block"
      />

      {/* Held to two lines. Wide enough for "BEST MANAGEMENT &" and narrow enough that
          "CONSULTING" cannot join it, so the block stays shorter than the logo and the
          header keeps the 72px height that --header-h and every scroll offset assume. */}
      <span
        className={cn(
          'hidden max-w-[9.5rem] text-[0.6875rem] font-medium leading-[1.35] tracking-[0.14em] uppercase sm:block',
          tone === 'bone' ? 'text-bone-2' : 'text-ink-2',
        )}
      >
        {name}
      </span>
    </span>
  );
}
