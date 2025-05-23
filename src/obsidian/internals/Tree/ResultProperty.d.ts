import type { ContentPosition } from './ContentPosition.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface ResultProperty {
    /** @todo Documentation incomplete. */
    key: string;

    /** @todo Documentation incomplete. */
    pos: ContentPosition;

    /** @todo Documentation incomplete. */
    subkey: (number | string)[];
}
