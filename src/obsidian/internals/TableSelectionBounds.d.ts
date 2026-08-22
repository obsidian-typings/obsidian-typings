/**
 * Bounds of a rectangular cell selection within a table.
 *
 * @public
 * @unofficial
 */
export interface TableSelectionBounds {
  /**
   * Highest column index in the selection.
   */
  maxCol: number;

  /**
   * Highest row index in the selection.
   */
  maxRow: number;

  /**
   * Lowest column index in the selection.
   */
  minCol: number;

  /**
   * Lowest row index in the selection.
   */
  minRow: number;
}
