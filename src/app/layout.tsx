import type { ReactNode } from 'react';

/**
 * Pass-through root. The real document, including `lang` and `dir`, is rendered by
 * `app/[locale]/layout.tsx`, because those attributes depend on the route parameter and
 * the root layout cannot read one.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
