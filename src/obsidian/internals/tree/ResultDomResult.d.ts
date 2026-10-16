import type { ContentPosition } from './ContentPosition.d.ts';
import type { ResultProperty } from './ResultProperty.d.ts';

/**
 * Search result data containing matched content positions and property matches.
 *
 * Every member is optional: each producer writes only the keys it matched. A canvas result carries only
 * `canvas-` keys (and `filename` when the file name matched), the unlinked-mentions pane writes no
 * `properties`, and a search match carries only the keys its query touched.
 *
 * @public
 * @unofficial
 */
export interface ResultDomResult {
  /**
   * Array of content match positions within the document.
   */
  content?: ContentPosition[];

  /**
   * Match positions within the file name.
   */
  filename?: ContentPosition[];

  /**
   * Match positions within the file path.
   */
  filepath?: ContentPosition[];

  /**
   * Array of matched property results.
   */
  properties?: ResultProperty[];

  /**
   * Match positions within a property name.
   */
  propertyName?: ContentPosition[];

  /**
   * Match positions within a tag.
   */
  tag?: ContentPosition[];

  /**
   * Match positions within each canvas text node, keyed by `canvas-` plus the node id.
   */
  [canvasNodeKey: `canvas-${string}`]: ContentPosition[];
}
