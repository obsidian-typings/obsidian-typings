import type {
  EditorSelection as CmEditorSelection,
  Text
} from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import type {
  App,
  Component,
  Editor
} from 'obsidian';

import type { CellDirection } from './CellDirection.d.ts';
import type { CellPosition } from './CellPosition.d.ts';
import type { CursorPlacement } from './CursorPlacement.d.ts';
import type { TableAlignment } from './TableAlignment.d.ts';
import type { TableCell } from './TableCell.d.ts';
import type { TableCellChange } from './TableCellChange.d.ts';
import type { TableCellEditor } from './TableCellEditor.d.ts';
import type { TableRow } from './TableRow.d.ts';
import type { TableSelectionBounds } from './TableSelectionBounds.d.ts';

/**
 * Widget that manages a rendered markdown table in the editor.
 *
 * Extends the CM6 WidgetType class via two intermediate Obsidian classes
 * (ChildWidgetType and ObsidianWidgetType). Manages the full lifecycle of
 * table rendering, cell editing, row/column operations, selection,
 * clipboard, drag handles, and document synchronization.
 *
 * @public
 * @unofficial
 */
export interface TableEditor extends Component {
  /** Element containing table action buttons. */
  actionsEl: HTMLElement | null;

  /** Column alignment settings for the table. */
  alignments: TableAlignment[];

  /** Reference to the app. */
  app: App;

  /** Map from table cells to their child components. */
  cellChildMap: Map<TableCell, Component>;

  /** Child components managed by this widget. */
  children: Component[];

  /** Computed column widths. */
  colWidths: number[];

  /** Container element for the table widget. */
  containerEl: HTMLDivElement;

  /** CodeMirror document snapshot for the table region. */
  doc: Text;

  /** Obsidian editor instance owning this table. */
  editor: Editor;

  /** End offset of the table in the document. */
  end: number;

  /** Estimated height of the widget in pixels. */
  readonly estimatedHeight: number;

  /** Whether the document backing this table is complete. */
  isDocComplete: boolean;

  /** Whether the table source is malformed. */
  isMalformed: boolean;

  /** Rows of the table, each containing cells indexed by column. */
  rows: TableRow[];

  /** Currently selected cells. */
  selectedCells: TableCell[];

  /** Anchor cell of a multi-cell selection. */
  selectionAnchor: null | TableCell;

  /** Head cell of a multi-cell selection. */
  selectionHead: null | TableCell;

  /** Start offset of the table in the document. */
  start: number;

  /** Root table DOM element. */
  tableEl: HTMLTableElement;

  /** Plain text content of the table. */
  readonly text: string;

  /**
   * Add a new line before or after the table.
   *
   * @param placement - Whether to add the line before or after.
   */
  addNewLine(placement: CursorPlacement): void;

  /**
   * Apply cell content updates to the document.
   *
   * @param changes - Transaction changes to apply.
   * @param cellMap - Map of cells to their updated text.
   * @param annotations - Transaction annotations to attach.
   */
  applyCellUpdates(changes: unknown, cellMap: Map<TableCell, string>, annotations: unknown[]): void;

  /**
   * Clean up child components.
   */
  cleanupChildren(): void;

  /**
   * Clear all rows, alignments, and DOM contents from the table.
   */
  clear(): void;

  /**
   * Check whether the given cell is fully enclosed by the current selection.
   *
   * @param cell - The cell to test.
   * @returns Whether the cell is contained by the selection.
   */
  containedBySelection(cell: TableCell): boolean;

  /**
   * Check whether a document range overlaps with the table.
   *
   * @param from - Start offset of the range.
   * @param to - End offset of the range.
   * @returns Whether the range overlaps with the table.
   */
  containsRange(from: number, to: number): boolean;

  /**
   * Check whether the current selection includes the given cell.
   *
   * @param cell - The cell to test.
   * @returns Whether the selection contains the cell.
   */
  containsSelection(cell: TableCell): boolean;

  /**
   * Copy the current cell selection to the clipboard, optionally cutting.
   *
   * @param event - The clipboard event.
   * @param cut - Whether to cut (remove) the selected content.
   */
  copySelection(event: ClipboardEvent, cut: boolean): void;

  /**
   * Create a drag handle element for a row or column.
   *
   * @param type - Whether the handle is for a row or column.
   * @param index - Index of the row or column.
   * @returns The drag handle element.
   */
  createDragHandle(type: 'col' | 'row', index: number): HTMLElement;

  /**
   * Delete the current cell selection.
   *
   * @param cut - Whether the deletion is a cut operation.
   */
  deleteSelection(cut: boolean): void;

  /**
   * Clear the current cell selection.
   */
  deselectCells(): void;

  /**
   * Clear the table-wide selection.
   */
  deselectTable(): void;

  /**
   * Dispatch a table update transaction to the editor.
   *
   * @param focusRow - Row to focus after dispatch.
   * @param focusCol - Column to focus after dispatch.
   * @param selectionFn - Optional function to compute the selection.
   */
  dispatchTable(focusRow?: number, focusCol?: number, selectionFn?: (view: EditorView) => CmEditorSelection): void;

  /**
   * Dispatch an update from the cell editor to the parent document.
   *
   * @param cellEditorUpdate - The cell editor update payload.
   * @param cellEditorTr - The cell editor transaction.
   */
  dispatchUpdate(cellEditorUpdate: unknown, cellEditorTr: unknown): void;

  /**
   * Get the cell above the given cell.
   *
   * @param cell - The reference cell.
   * @returns The cell above, or `null` if at the top.
   */
  getCellAbove(cell: TableCell): null | TableCell;

  /**
   * Get the cell at the given row and column.
   *
   * @param row - Row index.
   * @param col - Column index.
   * @returns The cell at the position, or `null` if out of bounds.
   */
  getCellAt(row: number, col: number): null | TableCell;

  /**
   * Get the cell below the given cell.
   *
   * @param cell - The reference cell.
   * @returns The cell below, or `null` if at the bottom.
   */
  getCellBelow(cell: TableCell): null | TableCell;

  /**
   * Get the closest cell to the given coordinates.
   *
   * @param x - Horizontal coordinate.
   * @param y - Vertical coordinate.
   * @returns The closest cell.
   */
  getClosestCell(x: number, y: number): TableCell;

  /**
   * Get the next cell in the given direction.
   *
   * @param cell - The reference cell.
   * @param direction - Direction to navigate.
   * @returns The next cell, or `null` if at the boundary.
   */
  getNextCell(cell: TableCell, direction: CellDirection): null | TableCell;

  /**
   * Get the selected state of a cell.
   *
   * @param cell - The cell to check.
   * @returns The cell if selected, or `null`.
   */
  getSelectedCell(cell: TableCell): null | TableCell;

  /**
   * Get the bounds of the current cell selection.
   *
   * @returns The selection bounds, or `null` if no selection.
   */
  getSelectionBounds(): null | TableSelectionBounds;

  /**
   * Get the markdown string for the cells within the given bounds.
   *
   * @param bounds - The selection bounds to serialize.
   * @returns The markdown table string.
   */
  getTableString(bounds: TableSelectionBounds): string;

  /**
   * Initialize the DOM structure for the table widget.
   */
  initDOM(): void;

  /**
   * Insert a column into the table.
   *
   * @param focusRow - Row to focus after insertion.
   * @param index - Column index at which to insert.
   * @param alignment - Alignment for the new column.
   * @param copyFromCol - Whether to copy content from an adjacent column.
   */
  insertColumn(focusRow: number, index: number, alignment: TableAlignment, copyFromCol?: boolean): void;

  /**
   * Insert a row into the table.
   *
   * @param index - Row index at which to insert.
   * @param focusCol - Column to focus after insertion.
   * @param copyFromRow - Row content to copy, or `false` for an empty row.
   */
  insertRow(index: number, focusCol: number, copyFromRow?: false | string): void;

  /**
   * Build a column alignment submenu.
   *
   * @param menu - The menu to populate.
   * @param cols - Column indices to include.
   */
  makeAlignmentMenu(menu: unknown, cols: number[]): void;

  /**
   * Build an alignment row in a menu.
   *
   * @param menu - The menu to populate.
   * @param cols - Column indices to include.
   */
  makeAlignmentRow(menu: unknown, cols: number[]): void;

  /**
   * Build a context menu for a column.
   *
   * @param menu - The menu to populate.
   * @param col - Column index.
   */
  makeColMenu(menu: unknown, col: number): void;

  /**
   * Build a context menu for a row.
   *
   * @param menu - The menu to populate.
   * @param row - Row index.
   */
  makeRowMenu(menu: unknown, row: number): void;

  /**
   * Build a sort submenu for a column.
   *
   * @param menu - The menu to populate.
   * @param col - Column index.
   */
  makeSortMenu(menu: unknown, col: number): void;

  /**
   * Move a column to a new position.
   *
   * @param from - Source column index.
   * @param to - Destination column index.
   * @param focusRow - Row to focus after the move.
   */
  moveColumn(from: number, to: number, focusRow: number): void;

  /**
   * Move a row to a new position.
   *
   * @param from - Source row index.
   * @param to - Destination row index.
   * @param focusCol - Column to focus after the move.
   */
  moveRow(from: number, to: number, focusCol: number): void;

  /**
   * Adjust offsets of cells after the given cell.
   *
   * @param cell - The reference cell.
   * @param offset - The offset to apply.
   */
  offsetCellsAfter(cell: TableCell, offset: number): void;

  /**
   * Handle a context menu event on a cell.
   *
   * @param event - The mouse event.
   * @param cell - The cell that was right-clicked.
   */
  onContextMenu(event: MouseEvent, cell: TableCell): void;

  /**
   * Paste clipboard content into the current cell selection.
   *
   * @param event - The clipboard event.
   */
  pasteSelection(event: ClipboardEvent): void;

  /**
   * Place the cursor before or after the table.
   *
   * @param placement - Whether to place the cursor before or after.
   */
  placeCursorAround(placement: CursorPlacement): void;

  /**
   * Place the cursor inside a cell at the given position.
   *
   * @param cell - The target cell.
   * @param position - Where to place the cursor within the cell.
   */
  placeCursorInCell(cell: TableCell, position: CellPosition): void;

  /**
   * Post-process a cell after rendering.
   *
   * @param cell - The cell to post-process.
   */
  postProcess(cell: TableCell): void;

  /**
   * Rebuild the table document from the current cell contents.
   *
   * @returns The rebuilt document.
   */
  rebuildTable(): Text;

  /**
   * Focus a cell and create a cell editor for it.
   *
   * @param row - Row index.
   * @param col - Column index.
   * @param selectionFn - Optional function to compute the editor selection.
   * @param isUserInitiated - Whether the focus was triggered by the user.
   * @returns The table cell editor.
   */
  receiveCellFocus(row: number, col: number, selectionFn?: (view: EditorView) => CmEditorSelection, isUserInitiated?: boolean): TableCellEditor;

  /**
   * Handle an incomplete document update from the editor.
   *
   * @param viewUpdate - The CodeMirror view update.
   * @param newDoc - The new document content.
   */
  receiveIncompleteUpdate(viewUpdate: unknown, newDoc: Text): void;

  /**
   * Handle a selection change from the editor.
   *
   * @param selection - The new editor selection.
   */
  receiveSelection(selection: unknown): void;

  /**
   * Handle a document update from the editor.
   *
   * @param viewUpdate - The CodeMirror view update.
   * @param newDoc - The new document content.
   * @returns Whether the table was successfully updated.
   */
  receiveUpdate(viewUpdate: unknown, newDoc: Text): boolean;

  /**
   * Reconcile external document changes with the table state.
   *
   * @param viewUpdate - The CodeMirror view update.
   * @param newDoc - The new document content.
   * @returns The reconciled changes.
   */
  reconcileChanges(viewUpdate: unknown, newDoc: Text): unknown;

  /**
   * Remove child components from a cell.
   *
   * @param cell - The cell whose children to remove.
   */
  removeChildren(cell: TableCell): void;

  /**
   * Remove a column from the table.
   *
   * @param focusRow - Row to focus after removal.
   * @param index - Column index to remove.
   */
  removeColumn(focusRow: number, index: number): void;

  /**
   * Remove a row from the table.
   *
   * @param index - Row index to remove.
   * @param focusCol - Column to focus after removal.
   */
  removeRow(index: number, focusCol: number): void;

  /**
   * Render the table widget.
   */
  render(): void;

  /**
   * Re-render a single cell.
   *
   * @param cell - The cell to re-render.
   */
  rerenderCell(cell: TableCell): void;

  /**
   * Select a range of cells between an anchor and head.
   *
   * @param anchor - The anchor cell of the selection.
   * @param head - The head cell of the selection.
   * @param force - Whether to force the selection update.
   */
  selectCells(anchor: TableCell, head: TableCell, force?: boolean): void;

  /**
   * Select all cells in the table.
   */
  selectTable(): void;

  /**
   * Show drag handles for a cell.
   *
   * @param cell - The cell to show drag handles for.
   */
  setActiveDragHandles(cell: TableCell): void;

  /**
   * Set the alignment of columns.
   *
   * @param cols - Column indices to align.
   * @param alignment - The alignment to apply.
   */
  setAlignment(cols: number[], alignment: 'center' | 'end' | 'start'): void;

  /**
   * Focus a cell without creating an editor.
   *
   * @param row - Row index.
   * @param col - Column index.
   * @param selectionFn - Optional function to compute the selection.
   */
  setCellFocus(row: number, col: number, selectionFn?: (view: EditorView) => CmEditorSelection): void;

  /**
   * Sort the table by a column.
   *
   * @param col - Column index to sort by.
   * @param direction - Sort direction.
   * @param focusRow - Row to focus after sorting.
   */
  sortByColumn(col: number, direction: 'asc' | 'desc', focusRow: number): void;

  /**
   * Create the DOM element for this widget.
   *
   * @returns The root DOM element.
   */
  toDOM(): HTMLElement;

  /**
   * Trim whitespace from a cell's content.
   *
   * @param cell - The cell to trim.
   */
  trimCell(cell: TableCell): void;

  /**
   * Hide drag handles for a cell.
   *
   * @param cell - The cell to hide drag handles for.
   */
  unsetActiveDragHandles(cell: TableCell): void;

  /**
   * Update a cell's text content.
   *
   * @param cell - The cell to update.
   * @param text - The new text content.
   * @returns Array of document change specs.
   */
  updateCell(cell: TableCell, text: string): TableCellChange[];

  /**
   * Callback to refresh cell readonly state.
   */
  updateCellReadonly(): void;

  /**
   * Clamp selection bounds to the table dimensions.
   *
   * @param bounds - The bounds to validate.
   * @returns The validated bounds.
   */
  validateSelectionBounds(bounds: TableSelectionBounds): TableSelectionBounds;
}
