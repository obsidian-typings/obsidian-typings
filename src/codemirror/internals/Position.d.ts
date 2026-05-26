/**
 * A position in a CodeMirror 5 document.
 *
 * @public
 * @unofficial
 */
export interface Position {
  /** Character position within the line. */
  ch: number;
  /** Line number (zero-based). */
  line: number;
  /** The sticky direction for cursor placement. */
  sticky?: string;
}
