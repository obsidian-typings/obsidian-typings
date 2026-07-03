export {};

declare module 'obsidian' {
  /**
   * A single undo/redo step in a {@link BasesView}, capturing a set of property changes and the view state to restore.
   */
  export interface BasesViewTransaction {
    /**
     * The property changes applied in this transaction.
     *
     * @unofficial
     */
    changes: BasesViewTransactionChange[];

    /**
     * The view ephemeral state to restore when this transaction is undone.
     *
     * @unofficial
     */
    state: unknown;
  }
}
