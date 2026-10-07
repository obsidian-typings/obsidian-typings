import type { BasesEntry } from 'obsidian';

import type { BasesTableCellBase } from './BasesTableCellBase.d.ts';

/**
 * A body cell of a {@link BasesTableView}, showing one property of one entry.
 *
 * @public
 * @unofficial
 */
export interface BasesTableCell extends BasesTableCellBase {
  /** The property-value renderer, created by `view.createRenderer`. */
  renderer: unknown;

  /**
   * Renders the cell's property for an entry.
   *
   * @param entry - The entry to render.
   */
  render(entry: BasesEntry): void;
}
