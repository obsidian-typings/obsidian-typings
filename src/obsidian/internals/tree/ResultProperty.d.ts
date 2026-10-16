import type { ContentPosition } from './ContentPosition.d.ts';

/**
 * Represents a matched property within a search result.
 *
 * @public
 * @unofficial
 */
export interface ResultProperty {
  /**
   * Property key name that was matched.
   */
  key: string;

  /**
   * {@link ContentPosition} of the match within the property value, absent for a bare `[key]` match.
   */
  pos?: ContentPosition;

  /**
   * Path below {@link ResultProperty.key}, one entry per segment.
   *
   * The search matcher sets it only for a match inside an array value, to the index of the matched item, as a
   * one-element array. The backlink recompute always sets it, from a `frontmatterLinks` key split on `.`: the
   * segments after the first, each a number when it parses as one and the string otherwise, so a bare key gives an
   * empty array and `a.b` gives `['b']`.
   */
  subkey?: (number | string)[];
}
