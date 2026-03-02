import type { MarkdownBaseView } from './MarkdownBaseView.d.ts';
import type { TableCell } from './TableCell.d.ts';

/**
 * Editor for a single table cell, combining markdown editing with cell properties.
 * @public
 * @unofficial
 */
export interface TableCellEditor extends MarkdownBaseView, TableCell {}
