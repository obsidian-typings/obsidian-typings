import type { ContentPosition } from './ContentPosition.d.ts';
import type { ResultProperty } from './ResultProperty.d.ts';

/** @public */
export interface ResultDomResult {
    content: ContentPosition[];
    properties: ResultProperty[];
}
