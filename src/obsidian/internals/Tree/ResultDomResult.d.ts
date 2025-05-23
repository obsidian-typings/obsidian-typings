import type { ContentPosition } from './ContentPosition.d.ts';
import type { ResultProperty } from './ResultProperty.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface ResultDomResult {
    /** @todo Documentation incomplete. */
    content: ContentPosition[];

    /** @todo Documentation incomplete. */
    properties: ResultProperty[];
}
