import type { SearchMatches } from 'obsidian';

/**
 * A link item of the property-value suggest, offered once the value starts with `[[`.
 *
 * These are the items of the link suggester the editor uses. Only the fields shared by every kind are modeled; each
 * kind carries more (`path` and `file` for `file`, `alias` for `alias`, `heading` and `level` for `heading`, ...).
 *
 * @public
 * @unofficial
 */
export interface PropertyValueSuggestLinkItem {
  /**
   * Matched ranges, or `null` for the `none` placeholder.
   */
  matches: null | SearchMatches;

  /**
   * Match score.
   */
  score: number;

  /**
   * Kind of the link item; `none` is the placeholder shown when nothing matches.
   */
  type: 'alias' | 'bases-view' | 'block' | 'file' | 'heading' | 'linktext' | 'none';
}
