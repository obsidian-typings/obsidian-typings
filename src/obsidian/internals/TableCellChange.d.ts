/**
 * Represents a document change produced by updating a table cell.
 *
 * @public
 * @unofficial
 */
export interface TableCellChange {
  /** Start offset of the change in the document. */
  from: number;

  /** Text to insert at the change position. */
  insert: string;

  /** End offset of the change in the document. */
  to: number;
}
