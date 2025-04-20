import type { ContentPosition } from './ContentPosition.d.ts';
import type { ResultProperty } from './ResultProperty.d.ts';

/**
 * @public
 * @unofficial
 */
export interface ResultDomResult {
    content: ContentPosition[];
    properties: ResultProperty[];
}
