import type { BasesPropertyId } from 'obsidian';

import type { BasesTableHeaderCell } from './BasesTableHeaderCell.d.ts';
import type { BasesTableView } from './BasesTableView.d.ts';

/**
 * The header row of a {@link BasesTableView}, holding one header cell per column.
 *
 * @public
 * @unofficial
 */
export interface BasesTableHeaderRow {
  /** The header cells, one per shown property. */
  cells: BasesTableHeaderCell[];

  /** The `.bases-tr` row element. */
  el: HTMLElement;

  /** The table view the row belongs to. */
  view: BasesTableView;

  /**
   * Renders the header cells for the properties.
   *
   * @param properties - The properties to show, in column order.
   */
  render(properties: BasesPropertyId[]): void;

  /**
   * Positions the cells inside the horizontal viewport and detaches the rest.
   *
   * @param columnWidths - The column widths, in column order.
   * @param start - The start of the horizontal viewport.
   * @param end - The end of the horizontal viewport.
   */
  virtualize(columnWidths: number[], start: number, end: number): void;
}
