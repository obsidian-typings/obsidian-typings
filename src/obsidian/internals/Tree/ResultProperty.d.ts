import type { ContentPosition } from './ContentPosition.d.ts';

/** @public @unofficial */
export interface ResultProperty {
    key: string;
    pos: ContentPosition;
    subkey: (number | string)[];
}
