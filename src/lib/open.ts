/**
 * The opening gate.
 *
 * When the veil is up, everything underneath is already painted: reveals would slide, the
 * cover chart would draw and the figures would count, all behind a sheet nobody can see
 * through. The reader would lift the veil onto a page that had already finished performing.
 *
 * So anything that plays once on arrival waits for this instead of for its own observer.
 * `data-veil` is stamped on `<html>` by the inline script in the layout, before first
 * paint, so the answer is already known by the time any of this runs.
 */

/** Fired on `window` when the veil finishes lifting. */
export const OPEN_EVENT = 'bmc:open';

/**
 * Runs `open` once the document is open: immediately when there is no veil, otherwise on
 * the lift. Returns a cleanup that cancels a pending wait.
 */
export function whenOpen(open: () => void): () => void {
  if (typeof document === 'undefined') return () => {};

  if (document.documentElement.dataset.veil !== 'on') {
    open();
    return () => {};
  }

  const handler = () => open();
  window.addEventListener(OPEN_EVENT, handler, { once: true });
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
