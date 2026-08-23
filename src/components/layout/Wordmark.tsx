import { cn } from '@/lib/cn';

/**
 * An original mark, drawn to replace the 1990s clip-art logo while keeping its idea: a
 * frame, a set of rising bars, and one stroke that breaks out of the frame. The breakout
 * bar is the wine signal, so the mark carries the tagline without a word of copy.
 */
export function Mark({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'bone' }) {
  const frame = tone === 'bone' ? 'var(--color-bone-3)' : 'var(--color-pine-ink)';
  const bar = tone === 'bone' ? 'var(--color-bone-2)' : 'var(--color-pine)';
  const signal = tone === 'bone' ? 'var(--color-wine-bright)' : 'var(--color-wine)';

  return (
    <svg
      viewBox="0 0 26 26"
      className={cn('shrink-0', className)}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Axis: the frame the ascent breaks out of. */}
      <path
        d="M4 3.5V22H22"
        stroke={frame}
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <rect x="7.6" y="15.4" width="3.2" height="6.6" fill={bar} />
      <rect x="12.6" y="11" width="3.2" height="11" fill={bar} />
      {/* Overshoots the frame line on purpose. */}
      <rect x="17.6" y="4.2" width="3.2" height="17.8" fill={signal} />
    </svg>
  );
}

export function Wordmark({
  label,
  className,
  tone = 'ink',
}: {
  label: string;
  className?: string;
  tone?: 'ink' | 'bone';
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Mark className="h-6 w-6" tone={tone} />
      <span
        className="font-display text-[1.375rem] leading-none tracking-[-0.01em]"
        style={{ color: tone === 'bone' ? 'var(--color-bone)' : 'var(--color-ink)' }}
      >
        {label}
      </span>
    </span>
  );
}
