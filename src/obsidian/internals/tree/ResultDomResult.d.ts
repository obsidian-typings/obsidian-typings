import type { ContentPosition } from './ContentPosition.d.ts';
import type { ResultProperty } from './ResultProperty.d.ts';

/**
 * Search result data containing matched content positions and property matches.
 * @public
 * @unofficial
 */
export interface ResultDomResult {
  /** Array of content match positions within the document. */
  content: ContentPosition[];

  /** Array of matched property results. */
  properties: ResultProperty[];
}
