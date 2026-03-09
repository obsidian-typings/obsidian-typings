import type { TableCellEditor } from './TableCellEditor.d.ts';

/**
 * Represents a single cell in a markdown table.
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

  /** Table cell editor that manages this cell. */
  table: TableCellEditor;

  /** Text content of the cell. */
  text: string;
}
