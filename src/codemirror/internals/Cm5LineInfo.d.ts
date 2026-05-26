import type { Cm5LineHandle } from './Cm5LineHandle.d.ts';

/**
 * Information about a line in a CodeMirror 5 editor.
 *
 * @public
 * @unofficial
 */
export interface Cm5LineInfo {
  /** The background CSS class. */
  bgClass: string;
  /** Object mapping gutter IDs to marker elements. */
  gutterMarkers: unknown;
  /** The line handle. */
  handle: Cm5LineHandle;
  /** The line number. */
  line: number;
  /** The text content of the line. */
  text: string;
  /** The text CSS class. */
  textClass: string;
  /** Array of line widgets attached to this line. */
  widgets: unknown;
  /** The wrapper CSS class. */
  wrapClass: string;
}
