export {};

declare module 'obsidian' {
  /**
   * Describes where a dragged tab would be inserted, returned by {@link WorkspaceTabs.getTabInsertLocation}.
   */
  export interface TabInsertLocation {
    /**
     * The index at which the dragged tab is currently dropped, or `null` when not over a valid drop target.
     *
     * @unofficial
     */
    droppedIndex: null | number;

    /**
     * The insertion index.
     *
     * @unofficial
     */
    index: number;

    /**
     * The rectangle marking the insertion position.
     *
     * @unofficial
     */
    rect: TabInsertRect;
  }
}
