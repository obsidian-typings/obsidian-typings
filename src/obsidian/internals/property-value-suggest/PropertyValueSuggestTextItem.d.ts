import type { SearchMatches } from 'obsidian';

/**
 * A plain-text item of the property-value suggest: one of the values the property already holds across the vault.
 *
 * @public
 * @unofficial
 */
export interface PropertyValueSuggestTextItem {
  /**
   * Matched ranges in `text`, or `null` when the query is empty.
   */
  matches: null | SearchMatches;

  /**
   * Match score, `0` when the query is empty.
   */
  score: number;

  /**
   * The suggested value.
   */
  text: string;

  /**
   * Discriminator of a plain-text item.
   */
  type: 'text';
}
