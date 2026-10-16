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
   * For a match inside an array value, the index of the matched item, as a one-element array.
   */
  subkey?: number[];
}
