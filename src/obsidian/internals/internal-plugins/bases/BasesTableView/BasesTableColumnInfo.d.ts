/**
 * The measured and configured widths of one column of a {@link BasesTableView}.
 *
 * @public
 * @unofficial
 */
export interface BasesTableColumnInfo {
  /** The width of the column's widest measured cell content, or `0` when not measured yet. */
  contentWidth: number;

  /** The width the user set by resizing the column, or `0` when none is set. */
  customWidth: number;

  /** The width of the column's header label. */
  headerWidth: number;

  /**
   * Gets the width to render the column at.
   *
   * @param minWidth - The minimum column width.
   * @param maxWidth - The maximum column width, which a custom width may exceed.
   * @returns The column width.
   */
  getWidth(minWidth: number, maxWidth: number): number;
}
