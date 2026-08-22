/**
 * Offsets of a table cell within the whole document.
 *
 * @public
 * @unofficial
 */
export interface TableCellOffsets {
  /**
   * End offset of the cell, including trailing padding.
   */
  end: number;

  /**
   * Start offset of the cell, including leading padding.
   */
  start: number;

  /**
   * End offset of the cell's text, excluding trailing padding.
   */
  textEnd: number;

  /**
   * Start offset of the cell's text, excluding leading padding.
   */
  textStart: number;
}
