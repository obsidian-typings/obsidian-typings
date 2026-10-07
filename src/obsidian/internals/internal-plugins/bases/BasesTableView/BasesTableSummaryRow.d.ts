import type {
  BasesEntry,
  BasesPropertyId
} from 'obsidian';

import type { BasesTableCellBase } from './BasesTableCellBase.d.ts';
import type { BasesTableView } from './BasesTableView.d.ts';

/**
 * A summary row of a {@link BasesTableView}: the table's footer, or the summary row at the top of a group.
 *
 * @public
 * @unofficial
 */
export interface BasesTableSummaryRow {
  /** The summary cells, one per shown property. */
  cells: BasesTableCellBase[];

  /** The `.bases-tr` row element. */
  el: HTMLElement;

  /** Where the row is shown. */
  location: 'footer' | 'group';

  /** The table view the row belongs to. */
  view: BasesTableView;

  /**
   * Renders the summary cells for the properties over the entries.
   *
   * @param properties - The properties to show, in column order.
   * @param entries - The entries to summarize.
   */
  render(properties: BasesPropertyId[], entries: BasesEntry[]): void;

  /**
   * Checks whether the row should be shown: the view has a summary for a shown property, and the row is the footer
   * or the data has more than one group.
   *
   * @returns Whether the row should be shown.
   */
  shouldDisplay(): boolean;

  /**
   * Positions the cells inside the horizontal viewport and detaches the rest.
   *
   * @param columnWidths - The column widths, in column order.
   * @param start - The start of the horizontal viewport.
   * @param end - The end of the horizontal viewport.
   */
  virtualize(columnWidths: number[], start: number, end: number): void;
}
