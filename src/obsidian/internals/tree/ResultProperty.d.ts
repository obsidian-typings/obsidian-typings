import type { ContentPosition } from './ContentPosition.d.ts';

/**
 * Represents a matched property within a search result.
 * @public
 * @unofficial
 */
export interface ResultProperty {
    /** Property key name that was matched. */
    key: string;

    /** Position of the match within the content. */
    pos: ContentPosition;

    /** Path of sub-keys for nested property matches. */
    subkey: (number | string)[];
}
