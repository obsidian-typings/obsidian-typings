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
  /** Column index of the cell. */
  col: number;

  /** Element containing the cell's content. */
  contentEl: HTMLElement;

  /** Whether the cell has been modified since the last save. */
  dirty: boolean;

  /** DOM element for the cell. */
  el: HTMLElement;

  /** End offset of the cell content in the document. */
  end: number;

  /** Trailing padding characters in the cell. */
  padEnd: number;

  /** Leading padding characters in the cell. */
  padStart: number;

  /** Row index of the cell. */
  row: number;

  /** Start offset of the cell content in the document. */
  start: number;

  /** Parent table editor that manages this cell. */
  table: TableEditor;

  /** Text content of the cell. */
  text: string;

  /**
   * Get the absolute document offsets for the cell.
   *
   * @returns The absolute offsets including start, end, text start, and text end.
   */
  getAbsoluteOffsets(): TableCellOffsets;

  /**
   * Get the total length of the cell content including padding.
   *
   * @returns The total length.
   */
  getLength(): number;

  /**
   * Get the cell text with leading and trailing padding characters.
   *
   * @returns The padded text content.
   */
  getTextWithPadding(): string;

  /**
   * Handle mobile caret drag interaction for this cell.
   *
   * @param view - The CodeMirror editor view.
   * @param pointerId - The pointer event identifier.
   */
  handleMobileCaretDrag(view: EditorView, pointerId: number): void;

  /**
   * Initialize the cell with a DOM element and document offsets.
   *
   * @param el - The cell's DOM element.
   * @param start - Start offset in the document.
   * @param end - End offset in the document.
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
   * Recalculate the cell's padding based on a target column width and alignment.
   *
   * @param width - The target column width.
   */
  updateWidth(width: number): void;
}
