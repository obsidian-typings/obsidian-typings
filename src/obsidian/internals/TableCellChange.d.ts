/**
 * A document change produced by updating a table cell.
 *
 * @public
 * @unofficial
 */
export interface TableCellChange {
  /**
   * Start offset of the change.
   */
  from: number;

  /**
   * Text to insert in place of the replaced range.
   */
  insert: string;

  /**
   * End offset of the change.
   */
  to: number;
}
