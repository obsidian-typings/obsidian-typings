import type { BasesTableColumnInfo } from './BasesTableColumnInfo.d.ts';
import type { BasesTableHeaderCell } from './BasesTableHeaderCell.d.ts';

/**
 * The column a resize handle of a {@link BasesTableView} acts on.
 *
 * @public
 * @unofficial
 */
export interface BasesTableResizeInfo {
  /** The header cell of the column. */
  cell: BasesTableHeaderCell;

  /** The widths of the column. */
  info: BasesTableColumnInfo;

  /** Whether the header cell is laid out left to right. */
  ltr: boolean;
}
