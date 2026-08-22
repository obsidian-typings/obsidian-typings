import type { EditorView } from '@codemirror/view';

import type { TableCellOffsets } from './TableCellOffsets.d.ts';
import type { TableEditor } from './TableEditor.d.ts';

/**
 * Represents a single cell in a markdown table.
 *
 * @public
 * @unofficial
 */
export interface TableCell {
  /**
   * Column index of the cell.
   */
  col: number;

  /**
   * Element containing the cell's content.
   */
  contentEl: HTMLElement;

  /**
   * Whether the cell has been modified since the last save.
   */
  dirty: boolean;

  /**
   * DOM element for the cell.
   */
  el: HTMLElement;

  /**
   * End offset of the cell content, relative to the start of the table.
   */
  end: number;

  /**
   * Number of trailing padding spaces in the cell.
   */
  padEnd: number;

  /**
   * Number of leading padding spaces in the cell.
   */
  padStart: number;

  /**
   * Row index of the cell.
   */
  row: number;

  /**
   * Start offset of the cell content, relative to the start of the table.
   */
  start: number;

  /**
   * Table widget that owns this cell.
   */
  table: TableEditor;

  /**
   * Text content of the cell, without padding.
   */
  text: string;

  /**
   * Get the offsets of the cell within the whole document.
   *
   * @returns The absolute offsets, with and without padding.
   */
  getAbsoluteOffsets(): TableCellOffsets;

  /**
   * Get the total length of the cell content including padding.
   *
   * @returns The total length.
   */
  getLength(): number;

  /**
   * Get the cell text with its leading and trailing padding spaces.
   *
   * @returns The padded text content.
   */
  getTextWithPadding(): string;

  /**
   * Handle a mobile caret drag interaction for this cell.
   *
   * @param view - The CodeMirror editor view.
   * @param pointerId - The pointer event identifier.
   */
  handleMobileCaretDrag(view: EditorView, pointerId: number): void;

  /**
   * Initialize the cell with a DOM element and its offsets within the table.
   *
   * @param el - The cell's DOM element.
   * @param start - Start offset, relative to the start of the table.
   * @param end - End offset, relative to the start of the table.
   */
  init(el: HTMLElement, start: number, end: number): void;

  /**
   * Lock the cell's current dimensions to prevent layout reflow during operations.
   */
  lockDimensions(): void;

  /**
   * Scroll the cell into the visible area of the editor.
   */
  scrollIntoView(): void;

  /**
   * Set the text direction of the cell based on its content.
   */
  setTextDir(): void;

  /**
   * Recalculate the cell's padding for a target column width, honouring the column's alignment.
   *
   * @param width - The target column width.
   */
  updateWidth(width: number): void;
}
