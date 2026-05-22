/**
 * The number of undo and redo operations available.
 *
 * @public
 * @unofficial
 */
export interface DocHistorySize {
  /** The number of redo operations available. */
  redo: number;
  /** The number of undo operations available. */
  undo: number;
}
