import type { BasesPropertyId } from 'obsidian';

import type { BasesTableView } from './BasesTableView.d.ts';

/**
 * The base of every cell of a {@link BasesTableView} - body, header and summary cells alike.
 * Each cell registers its element in the view's `cellLookup`.
 *
 * @public
 * @unofficial
 */
export interface BasesTableCellBase {
  /** The `.bases-td` cell element. */
  el: HTMLElement;

  /** The property the cell's column shows. */
  prop: BasesPropertyId;

  /** The table view the cell belongs to. */
  view: BasesTableView;
}
