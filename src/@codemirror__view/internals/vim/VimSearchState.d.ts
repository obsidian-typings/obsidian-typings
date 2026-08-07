import type { VimSearchOverlay } from './VimSearchOverlay.d.ts';

/**
 * The per-editor search state: the active query, its highlight overlay, and the direction it runs in.
 *
 * The query and its direction are stored globally, so every editor shares them; only the overlay and
 * its highlight timer are per-editor.
 *
 * @public
 * @unofficial
 */
export interface VimSearchState {
  /**
   * The pending timer that installs the highlight overlay, or `null` when none is pending.
   */
  highlightTimeout?: null | number;

  /**
   * Get the overlay highlighting the current query's matches.
   *
   * @returns The overlay, or `undefined` when no query is highlighted.
   */
  getOverlay(): undefined | VimSearchOverlay;

  /**
   * Get the current search query.
   *
   * @returns The query, or `null` when nothing has been searched for yet.
   */
  getQuery(): null | RegExp;

  /**
   * Get the scrollbar annotation showing where the matches are.
   *
   * @returns The annotation, or `undefined` when the editor does not annotate its scrollbar. Obsidian's
   * adapter does not, so this is always `undefined` there.
   */
  getScrollbarAnnotate(): unknown;

  /**
   * Check whether the search runs towards the start of the document.
   *
   * @returns Whether the search is reversed.
   */
  isReversed(): boolean;

  /**
   * Set the overlay highlighting the current query's matches.
   *
   * @param overlay - The overlay to install, or `null` to clear it.
   */
  setOverlay(overlay: null | VimSearchOverlay): void;

  /**
   * Set the current search query.
   *
   * @param query - The query to search for.
   */
  setQuery(query: RegExp): void;

  /**
   * Set whether the search runs towards the start of the document.
   *
   * @param reversed - Whether the search is reversed.
   */
  setReversed(reversed: boolean): void;

  /**
   * Set the scrollbar annotation showing where the matches are.
   *
   * @param annotate - The annotation to store.
   */
  setScrollbarAnnotate(annotate: unknown): void;
}
