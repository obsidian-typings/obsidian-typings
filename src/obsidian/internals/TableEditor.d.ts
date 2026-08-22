import type {
  EditorSelection as CmEditorSelection,
  Text,
  Transaction
} from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import type {
  App,
  Component,
  Debouncer,
  Menu
} from 'obsidian';

import type { CellDirection } from './CellDirection.d.ts';
import type { CellPosition } from './CellPosition.d.ts';
import type { ChildWidgetType } from './ChildWidgetType.d.ts';
import type { CursorPlacement } from './CursorPlacement.d.ts';
import type { MarkdownBaseView } from './MarkdownBaseView.d.ts';
import type { TableAlignment } from './TableAlignment.d.ts';
import type { TableCell } from './TableCell.d.ts';
import type { TableCellChange } from './TableCellChange.d.ts';
import type { TableCellEditor } from './TableCellEditor.d.ts';
import type { TableRow } from './TableRow.d.ts';
import type { TableSelectionBounds } from './TableSelectionBounds.d.ts';

/**
 * Widget that manages a rendered markdown table in the editor.
 *
 * Manages the full lifecycle of table rendering, cell editing, row/column operations, selection,
 * clipboard, drag handles, and document synchronization.
 *
 * @public
 * @unofficial
 */
export interface TableEditor extends ChildWidgetType {
  /**
   * Column alignment settings for the table.
   */
  alignments: TableAlignment[];

  /**
   * Map from table cells to the child components rendered inside them.
   */
  cellChildMap: Map<TableCell, Component[]>;

  /**
   * Computed column widths, in characters.
   */
  colWidths: number[];

  /**
   * Container element for the table widget.
   */
  containerEl: HTMLDivElement;

  /**
   * CodeMirror document snapshot for the table region.
   */
  doc: Text;

  /**
   * Estimated height of the widget in pixels.
   *
   * @remark Falls back to `50` while the widget has no measurable height.
   */
  readonly estimatedHeight: number;

  /**
   * Whether the document backing this table is complete.
   */
  isDocComplete: boolean;

  /**
   * Whether the table source is malformed.
   */
  isMalformed: boolean;

  /**
   * Rows of the table, each containing cells indexed by column.
   */
  rows: TableRow[];

  /**
   * Currently selected cells.
   */
  selectedCells: TableCell[];

  /**
   * Anchor cell of a multi-cell selection.
   */
  selectionAnchor: null | TableCell;

  /**
   * Head cell of a multi-cell selection.
   */
  selectionHead: null | TableCell;

  /**
   * Root table DOM element, or `null` until the table has been rendered.
   */
  tableEl: HTMLTableElement | null;

  /**
   * Plain text content of the table.
   */
  readonly text: string;

  /**
   * Refresh the readonly state of the focused cell editor.
   *
   * @remark Debounced by 50ms.
   */
  updateCellReadonly: Debouncer<[], void>;

  /**
   * Add a new line before or after the table.
   *
   * @param placement - Whether to add the line before or after.
   */
  addNewLine(placement: CursorPlacement): void;

  /**
   * Apply pending cell content updates to the document.
   *
   * @param tr - The transaction the updates came from.
   * @param cellMap - Map of cells to the changes made within them, relative to each cell's start.
   * @param offset - Offset introduced by a change to the alignment row.
   */
  applyCellUpdates(tr: Transaction, cellMap: Map<TableCell, TableCellChange[]>, offset: number): void;

  /**
   * Unload the child components of every cell.
   */
  cleanupChildren(): void;

  /**
   * Clear all rows, alignments, and DOM contents from the table.
   */
  clear(): void;

  /**
   * Constructor.
   *
   * To extract the constructor type, use {@link ExtractConstructor | ExtractConstructor\<TableEditor\>}.
   *
   * @param app - The app.
   * @param editor - The edit view that owns the widget.
   * @param doc - The table's source document.
   * @param isDocComplete - Whether the source document is complete.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor3__?(app: App, editor: MarkdownBaseView, doc: Text, isDocComplete: boolean): this;

  /**
   * Check whether the selection fully encloses the table.
   *
   * @param selection - The selection to test.
   * @returns Whether any range of the selection contains the whole table.
   */
  containedBySelection(selection: CmEditorSelection): boolean;

  /**
   * Check whether a document range lies within the table.
   *
   * @param from - Start offset of the range.
   * @param to - End offset of the range.
   * @returns Whether the range lies within the table.
   */
  containsRange(from: number, to: number): boolean;

  /**
   * Check whether every range of the selection lies within the table.
   *
   * @param selection - The selection to test.
   * @returns Whether the table contains the selection.
   */
  containsSelection(selection: CmEditorSelection): boolean;

  /**
   * Copy the current cell selection to the clipboard, optionally cutting.
   *
   * @param event - The clipboard event.
   * @param cut - Whether to cut (remove) the selected content.
   */
  copySelection(event: ClipboardEvent, cut: boolean): void;

  /**
   * Add a row or column drag handle to a cell.
   *
   * @param cell - The cell to add the handle to.
   * @param type - Whether the handle drags a row or a column.
   */
  createDragHandle(cell: TableCell, type: 'col' | 'row'): void;

  /**
   * Delete the current cell selection.
   *
   * @param cut - Whether the deletion is part of a cut operation.
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
   * Rebuild the table and dispatch it to the editor as a single change.
   *
   * @param focusRow - Row to focus after dispatch.
   * @param focusCol - Column to focus after dispatch.
   * @param selectionFn - Optional function computing the selection inside the focused cell.
   */
  dispatchTable(focusRow?: number, focusCol?: number, selectionFn?: (view: EditorView) => CmEditorSelection): void;

  /**
   * Forward an update made inside a cell editor to the parent document.
   *
   * @param cellEditor - The cell editor the update came from.
   * @param tr - The cell editor transaction.
   */
  dispatchUpdate(cellEditor: TableCellEditor, tr: Transaction): void;

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
   * Get the cell closest to the given viewport coordinates.
   *
   * @param x - Horizontal coordinate.
   * @param y - Vertical coordinate.
   * @returns The closest cell.
   */
  getClosestCell(x: number, y: number): TableCell;

  /**
   * Get the next cell in the given direction, wrapping across rows.
   *
   * @param cell - The reference cell.
   * @param direction - Direction to navigate.
   * @returns The next cell, or `null` if at the boundary.
   */
  getNextCell(cell: TableCell, direction: CellDirection): null | TableCell;

  /**
   * Get the single cell that fully contains every range of the selection.
   *
   * @param selection - The selection to resolve, relative to the start of the table.
   * @returns The cell containing the selection, or `null` if it spans more than one cell.
   */
  getSelectedCell(selection: CmEditorSelection): null | TableCell;

  /**
   * Get the bounds of the current cell selection.
   *
   * @returns The selection bounds, or `null` if there is no multi-cell selection.
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
   * Build the widget's container element.
   *
   * @returns The container element.
   */
  initDOM(): HTMLDivElement;

  /**
   * Insert a column into the table.
   *
   * @param focusRow - Row to focus after insertion.
   * @param index - Column index at which to insert.
   * @param alignment - Alignment for the new column.
   * @param copyFromCol - Whether to copy the width of the column currently at `index`.
   */
  insertColumn(focusRow: number, index: number, alignment: TableAlignment, copyFromCol?: boolean): void;

  /**
   * Insert a row into the table.
   *
   * @param index - Row index at which to insert.
   * @param focusCol - Column to focus after insertion.
   * @param copyFromRow - Whether to copy the contents of the row currently at `index`.
   */
  insertRow(index: number, focusCol: number, copyFromRow?: boolean): void;

  /**
   * Add the alignment items for the given columns to a menu.
   *
   * @param menu - The menu to populate.
   * @param cols - Column indices the items apply to.
   */
  makeAlignmentMenu(menu: Menu, cols: number[]): void;

  /**
   * Build the markdown alignment (separator) row for a range of columns.
   *
   * @param minCol - First column to include.
   * @param maxCol - Last column to include.
   * @returns The separator row, without a trailing newline.
   */
  makeAlignmentRow(minCol: number, maxCol: number): string;

  /**
   * Add the column items for a cell's column to a menu.
   *
   * @param menu - The menu to populate.
   * @param cell - Cell identifying the column.
   */
  makeColMenu(menu: Menu, cell: TableCell): void;

  /**
   * Add the row items for a cell's row to a menu.
   *
   * @param menu - The menu to populate.
   * @param cell - Cell identifying the row.
   */
  makeRowMenu(menu: Menu, cell: TableCell): void;

  /**
   * Add the sort items for a cell's column to a menu.
   *
   * @param menu - The menu to populate.
   * @param cell - Cell identifying the column to sort by.
   */
  makeSortMenu(menu: Menu, cell: TableCell): void;

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
   * Shift the document offsets of every cell after the given one.
   *
   * @param cell - The reference cell.
   * @param offset - The offset to apply.
   */
  offsetCellsAfter(cell: TableCell, offset: number): void;

  /**
   * Populate the context menu for a cell.
   *
   * @param cell - The cell that was right-clicked.
   * @param menu - The menu to populate.
   */
  onContextMenu(cell: TableCell, menu: Menu): void;

  /**
   * Paste clipboard content into the current cell selection.
   *
   * @param event - The clipboard event.
   */
  pasteSelection(event: ClipboardEvent): void;

  /**
   * Place the cursor on the line before or after the table, inserting one if needed.
   *
   * @param placement - Whether to place the cursor before or after.
   */
  placeCursorAround(placement: CursorPlacement): void;

  /**
   * Focus a cell and place the cursor inside it.
   *
   * @param cell - The target cell.
   * @param position - Where to place the cursor within the cell.
   */
  placeCursorInCell(cell: TableCell, position: CellPosition): void;

  /**
   * Run the markdown post-processors over a rendered cell.
   *
   * @param cell - The cell to post-process.
   */
  postProcess(cell: TableCell): void;

  /**
   * Rebuild the table document from the current cell contents and re-render it.
   *
   * @returns The rebuilt document.
   */
  rebuildTable(): Text;

  /**
   * Focus a cell and create a cell editor for it.
   *
   * @param row - Row index.
   * @param col - Column index.
   * @param selectionFn - Optional function computing the selection inside the cell editor.
   * @param isUserInitiated - Whether the focus was triggered by the user.
   * @returns The table cell editor.
   */
  receiveCellFocus(row: number, col: number, selectionFn?: (view: EditorView) => CmEditorSelection, isUserInitiated?: boolean): TableCellEditor;

  /**
   * Handle a document update while the table's source is still incomplete.
   *
   * @param tr - The transaction that changed the document.
   * @param newDoc - The new table document.
   * @returns Whether the table is up to date with the new document.
   */
  receiveIncompleteUpdate(tr: Transaction, newDoc: Text): boolean;

  /**
   * Handle a selection change from the editor, moving focus into or out of the table.
   *
   * @param tr - The transaction that changed the selection.
   */
  receiveSelection(tr: Transaction): void;

  /**
   * Handle a document update from the editor.
   *
   * @param tr - The transaction that changed the document.
   * @param newDoc - The new table document.
   * @returns Whether the table was successfully updated.
   */
  receiveUpdate(tr: Transaction, newDoc: Text): boolean;

  /**
   * Try to reconcile external document changes with the table state without a full re-render.
   *
   * @param newDoc - The new table document.
   * @param tr - The transaction that changed the document.
   * @returns The reconciled document, or `null` if the changes cannot be reconciled.
   */
  reconcileChanges(newDoc: Text, tr: Transaction): null | Text;

  /**
   * Unload the child components of a cell.
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
   * Render the table into the container element.
   */
  render(): void;

  /**
   * Re-render a single cell.
   *
   * @param cell - The cell to re-render.
   */
  rerenderCell(cell: TableCell): void;

  /**
   * Select the rectangular range of cells between an anchor and a head.
   *
   * @param anchor - The anchor cell of the selection.
   * @param head - The head cell of the selection.
   * @param force - Whether to update the selection even if it did not change.
   */
  selectCells(anchor: TableCell, head: TableCell, force?: boolean): void;

  /**
   * Select every cell in the table.
   */
  selectTable(): void;

  /**
   * Show the drag handles belonging to a cell's row and column.
   *
   * @param cell - The cell whose handles to show.
   */
  setActiveDragHandles(cell: TableCell): void;

  /**
   * Set the alignment of columns.
   *
   * @param cols - Column indices to align.
   * @param alignment - The alignment to apply, resolved against the table's text direction.
   */
  setAlignment(cols: number[], alignment: 'center' | 'end' | 'start'): void;

  /**
   * Focus a cell, rebuilding the table first if its source is malformed.
   *
   * @param row - Row index.
   * @param col - Column index.
   * @param selectionFn - Optional function computing the selection inside the cell editor.
   */
  setCellFocus(row: number, col: number, selectionFn?: (view: EditorView) => CmEditorSelection): void;

  /**
   * Sort the table's body rows with the given comparator.
   *
   * @param focusRow - Row to focus after sorting.
   * @param col - Column index whose cells are passed to the comparator.
   * @param compareFn - Comparator receiving the two cells of `col` being compared.
   */
  sortByColumn(focusRow: number, col: number, compareFn: (a: TableCell, b: TableCell) => number): void;

  /**
   * Create the DOM element for this widget.
   *
   * @returns The container element.
   */
  toDOM(): HTMLDivElement;

  /**
   * Trim whitespace from a cell's content, marking the table malformed if anything changed.
   *
   * @param cell - The cell to trim.
   */
  trimCell(cell: TableCell): void;

  /**
   * Hide the drag handles belonging to a cell's row and column.
   *
   * @param cell - The cell whose handles to hide.
   */
  unsetActiveDragHandles(cell: TableCell): void;

  /**
   * Update a cell's text and re-pad every cell in its column to the new width.
   *
   * @param cell - The cell to update.
   * @param text - The new text content.
   * @returns The document changes needed, relative to the start of the table.
   */
  updateCell(cell: TableCell, text: string): TableCellChange[];

  /**
   * Clamp selection bounds to the table dimensions.
   *
   * @param bounds - The bounds to clamp.
   * @returns The clamped bounds.
   */
  validateSelectionBounds(bounds: TableSelectionBounds): TableSelectionBounds;
}
