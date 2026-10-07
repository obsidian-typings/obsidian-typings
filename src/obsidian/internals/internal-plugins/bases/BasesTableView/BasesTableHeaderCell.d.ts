import type { BasesTableCellBase } from './BasesTableCellBase.d.ts';

/**
 * A header cell of a {@link BasesTableView}, labelling one column.
 *
 * @public
 * @unofficial
 */
export interface BasesTableHeaderCell extends BasesTableCellBase {
  /** The `.bases-table-header-icon` element. */
  iconEl: HTMLElement;

  /** The `.bases-table-header-label` element, whose scroll width is the column's header width. */
  innerEl: HTMLElement;

  /** The `.bases-table-header-name` element. */
  nameEl: HTMLElement;

  /** The `.bases-table-header-sort` element. */
  sortEl: HTMLElement;
}
