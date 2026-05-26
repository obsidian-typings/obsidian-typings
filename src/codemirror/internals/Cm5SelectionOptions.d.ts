/**
 * Options for selection operations in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5SelectionOptions {
  /** Direction into which selection endpoints should be adjusted (-1 backward, 1 forward). */
  bias?: number;
  /** Determines whether the selection history event may be merged with the previous one. */
  origin?: string;
  /** Determines whether the selection head should be scrolled into view. */
  scroll?: boolean;
}
