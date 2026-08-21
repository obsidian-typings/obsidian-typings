/**
 * Absolute document offsets for a table cell.
 *
 * @public
 * @unofficial
 */
export interface TableCellOffsets {
  /** End offset of the cell in the document. */
  end: number;

  /** Start offset of the cell in the document. */
  start: number;

  /** End offset of the cell's text content in the document. */
  textEnd: number;

  /** Start offset of the cell's text content in the document. */
  textStart: number;
}
