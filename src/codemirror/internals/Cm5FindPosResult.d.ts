/**
 * Result of a cursor position search in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5FindPosResult {
  /** Character position within the line. */
  ch: number;
  /** Whether the edge of the document was reached. */
  hitSide?: boolean;
  /** Line number. */
  line: number;
}
