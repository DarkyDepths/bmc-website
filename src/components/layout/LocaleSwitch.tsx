import { locales, localeMeta, type Locale } from '@/i18n/config';
import { cn } from '@/lib/cn';

/**
 * Three links rather than a dropdown. The site is one page in three locales, so a menu
 * would add a focus trap and a state machine to save a single click. This also reads like
 * the language line on the inside cover of a printed document.
 */
export function LocaleSwitch({
  current,
  label,
  tone = 'ink',
  className,
}: {
  current: Locale;
  label: string;
  tone?: 'ink' | 'bone';
  className?: string;
}) {
  return (
    <div className={cn('flex items-center', className)} role="group" aria-label={label}>
      {locales.map((locale, index) => {
        const isCurrent = locale === current;
        return (
          <span key={locale} className="flex items-center">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className={cn(
                  'mx-2 h-3 w-px',
                  tone === 'bone' ? 'bg-pine-line' : 'bg-rule-2',
                )}
              />
            ) : null}
            <a
              href={`/${locale}/`}
              hrefLang={localeMeta[locale].hreflang}
              lang={localeMeta[locale].hreflang}
              aria-current={isCurrent ? 'true' : undefined}
              className={cn(
                'label transition-colors duration-300 ease-out-expo',
                isCurrent
                  ? tone === 'bone'
                    ? 'text-bone'
                    : 'text-ink'
                  : tone === 'bone'
                    ? 'text-bone-3 hover:text-bone'
                    : 'text-ink-3 hover:text-ink',
              )}
            >
              {localeMeta[locale].short}
            </a>
          </span>
        );
      })}
    </div>
  );
}
