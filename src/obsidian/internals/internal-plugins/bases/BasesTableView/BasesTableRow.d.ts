import type {
  BasesEntry,
  BasesPropertyId
} from 'obsidian';

import type { BasesTableCell } from './BasesTableCell.d.ts';
import type { BasesTableView } from './BasesTableView.d.ts';

/**
 * A rendered body row of a {@link BasesTableView}, showing one entry. The view keeps one per row currently in the
 * viewport in `rows`, and recycles the rest through `unusedRows`.
 *
 * @public
 * @unofficial
 */
export interface BasesTableRow {
  /** The row's cells, one per shown property. */
  cells: BasesTableCell[];

  /** The `.bases-tr` row element. */
  el: HTMLElement;

  /** The entry the row shows. Set by `render`, so a row recycled before its first render has none. */
  entry: BasesEntry;

  /** The table view the row belongs to. */
  view: BasesTableView;

  /**
   * Renders the row for an entry, creating, reusing or removing cells to match the properties.
   *
   * @param entry - The entry to render.
   * @param properties - The properties to show, in column order.
   */
  render(entry: BasesEntry, properties: BasesPropertyId[]): void;

  /**
   * Positions the cells inside the horizontal viewport and detaches the rest.
   *
   * @param columnWidths - The column widths, in column order.
   * @param start - The start of the horizontal viewport.
   * @param end - The end of the horizontal viewport.
   */
  virtualize(columnWidths: number[], start: number, end: number): void;
}
