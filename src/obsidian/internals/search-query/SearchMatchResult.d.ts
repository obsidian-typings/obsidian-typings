import type { ContentPosition } from '../tree/ContentPosition.d.ts';
import type { ResultProperty } from '../tree/ResultProperty.d.ts';

/**
 * The result of matching a search query, keyed by the input each range was found in.
 *
 * A canvas file's result also carries one `canvas-<nodeId>` entry per matching text node.
 *
 * @public
 * @unofficial
 */
export interface SearchMatchResult {
  /**
   * Ranges matched in the content.
   */
  content?: ContentPosition[];

  /**
   * Ranges matched in the file name.
   */
  filename?: ContentPosition[];

  /**
   * Ranges matched in the file path.
   */
  filepath?: ContentPosition[];

  /**
   * Matched frontmatter properties.
   */
  properties?: ResultProperty[];

  /**
   * Ranges matched in a property name.
   */
  propertyName?: ContentPosition[];

  /**
   * Ranges matched in a tag.
   */
  tag?: ContentPosition[];
}
