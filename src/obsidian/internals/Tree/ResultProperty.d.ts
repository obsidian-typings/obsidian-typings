import type { ContentPosition } from './ContentPosition.d.ts';

/** @public */
export interface ResultProperty {
    key: string;
    pos: ContentPosition;
    subkey: (number | string)[];
}
