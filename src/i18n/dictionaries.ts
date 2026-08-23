import ar from '@/messages/ar';
import en from '@/messages/en';
import fr, { type Dict } from '@/messages/fr';

import type { Locale } from './config';

const dictionaries: Record<Locale, Dict> = { fr, en, ar };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}

export type { Dict };
