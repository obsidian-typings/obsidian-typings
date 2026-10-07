import type {
  BasesEntryGroup,
  BasesPropertyId
} from 'obsidian';

import type { BasesTableSummaryRow } from './BasesTableSummaryRow.d.ts';
import type { BasesTableView } from './BasesTableView.d.ts';

/**
 * The rendered table of one group of a {@link BasesTableView}, matching one entry of the view's `data.groupedData`.
 *
 * @public
 * @unofficial
 */
export interface BasesTableGroup {
  /** The offset of the group's body from the top of its table, in pixels. */
  childStart: number;

  /** The properties the group was last rendered with, in column order. */
  columns: BasesPropertyId[];

  /** The height of the group's table without its body, in pixels. */
  selfHeight: number;

  /** The group's summary row. */
  summaryRow: BasesTableSummaryRow;

  /** The `.bases-table` element of the group. */
  tableEl: HTMLElement;

  /** The `.bases-tbody` element holding the group's rows. */
  tbodyEl: HTMLElement;

  /** The table view the group belongs to. */
  view: BasesTableView;

  /**
   * Renders the group's heading and summary row.
   *
   * @param properties - The properties to show, in column order.
   * @param group - The group to render.
   */
  render(properties: BasesPropertyId[], group: BasesEntryGroup): void;

  /**
   * Sizes the group's summary row and positions its cells inside the horizontal viewport.
   *
   * @param width - The total table width.
   * @param columnWidths - The column widths, in column order.
   * @param start - The start of the horizontal viewport.
   * @param end - The end of the horizontal viewport.
   */
  virtualize(width: number, columnWidths: number[], start: number, end: number): void;
}
