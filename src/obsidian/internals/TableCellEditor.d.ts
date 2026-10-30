import type { MarkdownBaseView } from './MarkdownBaseView.d.ts';
import type { TableCell } from './TableCell.d.ts';
import type { TableEditor } from './TableEditor.d.ts';

/**
 * {@link obsidian#Editor} for a single table cell, combining markdown editing with cell properties.
 *
 * @public
 * @unofficial
 */
export interface TableCellEditor extends MarkdownBaseView, TableCell {
  /**
   * Constructor.
   *
   * To extract the constructor type, use {@link ExtractConstructor | ExtractConstructor\<TableCellEditor\>}.
   *
   * @param editor - The editor holding the table, whose app and owner the cell editor shares.
   * @param containerEl - The element the cell editor is created in.
   * @param table - The table the cell belongs to.
   * @param cell - The cell to edit.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor3__?(editor: MarkdownBaseView, containerEl: HTMLElement, table: TableEditor, cell: TableCell): this;
}
