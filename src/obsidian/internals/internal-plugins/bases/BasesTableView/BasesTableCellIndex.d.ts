/**
 * The position of a cell in a {@link BasesTableView}, by group, row and column.
 *
 * @public
 * @unofficial
 */
export interface BasesTableCellIndex {
  /** The column index, into the view's `data.properties`. */
  column: number;

  /** The group index, into the view's `data.groupedData`. */
  groupIdx: number;

  /** The row index, into the group's `entries`. */
  row: number;
}
