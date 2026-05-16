import type { Position } from './Position.d.ts';

/**
 * Represents a change made to a CodeMirror 5 document.
 *
 * @public
 * @unofficial
 */
export interface Cm5EditorChange {
  /** The start position of the change. */
  from: Position;
  /** The origin of the change. */
  origin?: string;
  /** The text that was removed by the change. */
  removed?: string[];
  /** The new text that was inserted. */
  text: string[];
  /** The end position of the change. */
  to: Position;
}
