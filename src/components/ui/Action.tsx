import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Common = {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
};

type AsLink = Common & { href: string; type?: never; disabled?: never };
type AsButton = Common & { href?: never; type: 'submit' | 'button'; disabled?: boolean };

/**
 * Two actions exist in this system and no more. Square-ish corners, no shadow, no gradient,
 * no pill. The trailing rule extends on hover, which is the only movement a printed
 * document would allow itself.
 *
 * Renders an anchor when given `href` and a button when given `type`, so the form's submit
 * is the same object as the page's links rather than a second, slightly different button.
 */
export function Action({ variant = 'primary', className, children, ...rest }: AsLink | AsButton) {
  const base =
    'group inline-flex items-center gap-3 rounded-xs px-6 py-3.5 text-small font-medium ' +
    'transition-colors duration-300 ease-out-expo disabled:cursor-progress disabled:opacity-65';

  const skin =
    variant === 'primary'
      ? 'bg-wine text-paper hover:bg-wine-deep'
      : 'border border-[color:var(--hairline)] text-[color:inherit] hover:bg-pine hover:text-bone hover:border-pine';

  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'h-px w-3 shrink-0 transition-[width] duration-500 ease-out-expo group-hover:w-6',
          variant === 'primary' ? 'bg-paper' : 'bg-current',
        )}
      />
    </>
  );

  if ('href' in rest && rest.href) {
    return (
      <a href={rest.href} className={cn(base, skin, className)}>
        {inner}
      </a>
    );
  }

  const { type, disabled } = rest as AsButton;

  return (
    <button type={type} disabled={disabled} className={cn(base, skin, className)}>
      {inner}
    </button>
  );
}
