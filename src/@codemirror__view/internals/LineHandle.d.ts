/**
 * Handle referencing a specific line in the editor document.
 *
 * @public
 * @unofficial
 */
export interface LineHandle {
  /** Index of the line in the document. */
  index: number;

  /** Row number of the line. */
  row: number;
}
