/**
 * Represents the bounds of a cell selection within a table.
 *
 * @public
 * @unofficial
 */
export interface TableSelectionBounds {
  /** Maximum column index in the selection. */
  maxCol: number;

  /** Maximum row index in the selection. */
  maxRow: number;

  /** Minimum column index in the selection. */
  minCol: number;

  /** Minimum row index in the selection. */
  minRow: number;
}
