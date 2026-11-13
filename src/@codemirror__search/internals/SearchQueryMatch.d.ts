/**
 * A match result from a search query cursor.
 *
 * @public
 * @unofficial
 */
export interface SearchQueryMatch {
  /** The start position of the match. */
  from: number;
  /** The end position of the match. */
  to: number;
}
