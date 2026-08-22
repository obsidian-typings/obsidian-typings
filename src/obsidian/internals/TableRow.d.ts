import type { TableCell } from './TableCell.d.ts';

/**
 * A row in a markdown table, containing cells indexed by column.
 *
 * At runtime this is a plain `Array` of {@link TableCell} instances.
 * Obsidian's `Array.prototype` extensions (`first`, `last`, etc.)
 * are available on every row.
 *
 * @public
 * @unofficial
 */
export type TableRow = TableCell[];
