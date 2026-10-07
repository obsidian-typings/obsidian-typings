import type {
  BasesPropertyId,
  BasesViewFactory
} from 'obsidian';

import type { BasesTableCellBase } from './BasesTableCellBase.d.ts';
import type { BasesTableCellIndex } from './BasesTableCellIndex.d.ts';
import type { BasesTableColumnInfo } from './BasesTableColumnInfo.d.ts';
import type { BasesTableGroup } from './BasesTableGroup.d.ts';
import type { BasesTableHeaderRow } from './BasesTableHeaderRow.d.ts';
import type { BasesTableRect } from './BasesTableRect.d.ts';
import type { BasesTableResizeInfo } from './BasesTableResizeInfo.d.ts';
import type { BasesTableRow } from './BasesTableRow.d.ts';
import type { BasesTableScrollPosition } from './BasesTableScrollPosition.d.ts';
import type { BasesTableSelection } from './BasesTableSelection.d.ts';
import type { BasesTableSummaryRow } from './BasesTableSummaryRow.d.ts';

/**
 * The {@link obsidian#BasesView} the `Bases` plugin registers for the `table` view type. It renders the query
 * result as a virtualized table: only the rows inside the viewport are in the DOM, one {@link BasesTableRow} each.
 *
 * Reached from a `bases` leaf as `view.controller.view`, and from an embedded `base` code block through the host
 * view's child components.
 *
 * It extends {@link obsidian#BasesView} through the return type of {@link obsidian#BasesViewFactory}: importing
 * `BasesView` directly collides with this package's own `BasesView`, the `bases` leaf view, once the declarations
 * are bundled.
 *
 * @public
 * @unofficial
 */
export interface BasesTableView extends ReturnType<BasesViewFactory> {
  /** The position of the focused cell, or `null` when no cell is focused. */
  activeCell: BasesTableCellIndex | null;

  /** The `.bases-table-active-cell` element outlining the focused cell. */
  activeCellEl: HTMLElement;

  /** Maps every cell element of the view to its cell. */
  cellLookup: WeakMap<HTMLElement, BasesTableCellBase>;

  /** The widths of each column, by property. */
  columnInfo: Record<BasesPropertyId, BasesTableColumnInfo>;

  /** The `.bases-table-container` element holding the group tables. */
  containerEl: HTMLElement;

  /** The table's footer summary row. */
  footerSummary: BasesTableSummaryRow;

  /** The rendered group tables, one per entry of `data.groupedData`. */
  groups: BasesTableGroup[];

  /** The header row. */
  header: BasesTableHeaderRow;

  /** The scroll position at the last virtual display update. */
  lastScroll: BasesTableScrollPosition;

  /** The viewport at the last virtual display update, or `null` before the first one. */
  lastViewport: BasesTableRect | null;

  /** The maximum width a column is sized to from its content, in pixels. */
  maxColWidth: number;

  /** The minimum column width, in pixels. */
  minColWidth: number;

  /** The scroll position to restore at the next virtual display update, or `null` when there is none. */
  pendingScroll: BasesTableScrollPosition | null;

  /** The pending animation frame request for a column resize, or `0` when none is pending. */
  resizeFrame: number;

  /** The rendered body rows currently in the viewport, one per shown entry. */
  rows: BasesTableRow[];

  /** The scrolling element the table is rendered into. */
  scrollEl: HTMLElement;

  /** Stops watching the container's scrolling, or `null` while the view is not loaded. */
  scrollWatcher: (() => void) | null;

  /** The selected cell range, or `null` when there is no selection. */
  selection: BasesTableSelection | null;

  /** The `.bases-table-selection` element outlining the selected cells. */
  selectionEl: HTMLElement;

  /** The `.bases-thead` element holding the header row. */
  theadEl: HTMLElement;

  /** The view type. */
  type: 'table';

  /** Rendered rows scrolled out of the viewport, kept for reuse. At most 10 are kept. */
  unusedRows: BasesTableRow[];

  /**
   * Shows the resize handle of a column and its tooltip.
   *
   * @param property - The property of the column.
   */
  activateColumnResize(property: BasesPropertyId): void;

  /**
   * Clears the values of the selected cells within one transaction.
   *
   * @returns A promise that resolves when the values are cleared.
   */
  clearSelectedCells(): Promise<void>;

  /**
   * Re-renders the groups, header and footer from the current data and config, then updates the virtual display.
   */
  display(): void;

  /**
   * Gets the cell an element belongs to.
   *
   * @param el - An element inside a cell.
   * @returns The cell, or `null` when the element is not inside a `.bases-td` element, or `undefined` when that
   * element belongs to no cell.
   */
  getCellFromDom(el: HTMLElement): BasesTableCellBase | null | undefined;

  /**
   * Gets the position of a rendered body cell.
   *
   * @param cell - The cell.
   * @returns The cell's position, or `null` when the cell is not in a rendered row.
   */
  getCellIndex(cell: BasesTableCellBase): BasesTableCellIndex | null;

  /**
   * Gets the rectangle of a cell, relative to the scrolling element's content.
   *
   * @param index - The position of the cell.
   * @returns The rectangle of the cell.
   */
  getCellRect(index: BasesTableCellIndex): BasesTableRect;

  /**
   * Gets the cell of a group closest to a pointer position.
   *
   * @param evt - The pointer event.
   * @param groupIdx - The index of the group.
   * @returns The position of the closest cell.
   */
  getClosestCellIndexWithinGroup(evt: MouseEvent, groupIdx: number): BasesTableCellIndex;

  /**
   * Gets the column a resize handle acts on.
   *
   * @param el - An element inside a header cell.
   * @returns The column, or `null` when the element is not inside a header cell of a measured column.
   */
  getResizeInfo(el: HTMLElement): BasesTableResizeInfo | null;

  /**
   * Gets the base row height, from the `--bases-table-row-height` CSS variable.
   *
   * @returns The base row height, in pixels.
   */
  getRowBaseHeight(): number;

  /**
   * Gets the row height multiplier for the configured `rowHeight` option.
   *
   * @returns `1`, `2`, `4` or `8`.
   */
  getRowHeightMult(): number;

  /**
   * Checks whether the user set a width for a column.
   *
   * @param property - The property of the column.
   * @returns Whether the column has a custom width.
   */
  hasCustomColumnSize(property: BasesPropertyId): boolean;

  /**
   * Handles a group being collapsed or expanded.
   *
   * @param group - The group.
   */
  onGroupCollapsedChange(group: unknown): void;

  /**
   * Handles a context menu on a cell, offering actions for the selection.
   *
   * @param evt - The mouse event.
   * @param targetEl - The `.bases-td` element.
   */
  onTableCellContextmenu(evt: MouseEvent, targetEl: HTMLElement): void;

  /**
   * Handles a click on a header cell, toggling the sort by its property.
   *
   * @param evt - The mouse event.
   * @param targetEl - The `.bases-td` element.
   */
  onTableHeaderClick(evt: MouseEvent, targetEl: HTMLElement): void;

  /**
   * Handles the start of dragging a header cell, to reorder the columns.
   *
   * @param evt - The drag event.
   * @param targetEl - The `.bases-td` element.
   */
  onTableHeaderDragstart(evt: DragEvent, targetEl: HTMLElement): void;

  /**
   * Handles a double click on a column's resize handle, resetting the column's width.
   *
   * @param evt - The mouse event.
   * @param targetEl - The `.bases-table-header-resizer` element.
   */
  onTableHeaderResizerDblclick(evt: MouseEvent, targetEl: HTMLElement): void;

  /**
   * Handles the start of dragging a column's resize handle.
   *
   * @param evt - The drag event.
   * @param targetEl - The `.bases-table-header-resizer` element.
   */
  onTableHeaderResizerDragstart(evt: DragEvent, targetEl: HTMLElement): void;

  /**
   * Handles a pointer down on a column's resize handle, on mobile.
   *
   * @param evt - The pointer event.
   * @param targetEl - The `.bases-table-header-resizer` element.
   */
  onTableHeaderResizerPointerdown(evt: PointerEvent, targetEl: HTMLElement): void;

  /**
   * Handles a pointer down on a cell, starting a selection.
   *
   * @param evt - The pointer event.
   * @param targetEl - The `.bases-td` element.
   */
  onTableSelectionStart(evt: PointerEvent, targetEl: HTMLElement): void;

  /**
   * Resets the width of a column.
   *
   * @param property - The property of the column.
   */
  resetColumnResize(property: BasesPropertyId): void;

  /**
   * Resets a column's widths, re-renders and saves the column sizes.
   *
   * @param info - The widths of the column.
   */
  resetColumnSize(info: BasesTableColumnInfo): void;

  /**
   * Saves the custom column widths to the view's `columnSize` config.
   */
  saveColumnSizes(): void;

  /**
   * Schedules a virtual display update on the next animation frame, unless one is already scheduled.
   */
  scheduleResizeFrame(): void;

  /**
   * Measures the columns and renders the rows inside the viewport, recycling the rest.
   */
  updateVirtualDisplay(): void;
}
