/**
 * Specifies where to place the cursor within a table cell.
 *
 * @remark Any value other than `'end'` or `'last-line'` places the cursor at the start of the cell.
 * @public
 * @unofficial
 */
export type CellPosition = 'end' | 'last-line' | 'start';
