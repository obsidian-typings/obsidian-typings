/**
 * Represents a line in the document.
 *
 * @public
 * @unofficial
 */
export interface Line {
  /** The position at the start of the line. */
  readonly from: number;

  /** The length of the line (not counting the line break). */
  readonly length: number;

  /** The 1-based line number. */
  readonly number: number;

  /** The content of the line. */
  readonly text: string;

  /** The position at the end of the line (before any line break). */
  readonly to: number;
}
