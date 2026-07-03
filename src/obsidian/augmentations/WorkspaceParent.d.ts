export {};

declare module 'obsidian' {
  /**
   * Workspace parent.
   *
   * @since 0.9.7
   */
  interface WorkspaceParent extends WorkspaceItem {
    /**
     * Whether this parent is allowed to contain a single child (rather than collapsing it).
     *
     * @unofficial
     */
    allowSingleChild: boolean;

    /**
     * Whether this parent automatically manages the DOM of its children.
     *
     * @unofficial
     */
    autoManageDOM: boolean;

    /**
     * The child items contained in this parent.
     *
     * @unofficial
     */
    children: WorkspaceItem[];

    /**
     * Inserts a child at the given index.
     *
     * @param index - The index to insert at.
     * @param child - The child to insert.
     * @unofficial
     */
    insertChild(index: number, child: WorkspaceItem): void;

    /**
     * Recomputes the dimensions of the children.
     *
     * @unofficial
     */
    recomputeChildrenDimensions(): void;

    /**
     * Removes a child.
     *
     * @param child - The child to remove.
     * @unofficial
     */
    removeChild(child: WorkspaceItem): void;

    /**
     * Replaces the child at the given index.
     *
     * @param index - The index to replace at.
     * @param child - The replacement child.
     * @unofficial
     */
    replaceChild(index: number, child: WorkspaceItem): void;
  }
}
