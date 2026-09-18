export {};

declare module 'obsidian' {
  /**
   * The state of the view.
   */
  interface ViewState {
    /**
     * Whether the view is active.
     *
     * @official
     */
    active?: boolean;

    /**
     * The leaf group of the view.
     *
     * @official
     */
    group?: WorkspaceLeaf;

    /**
     * The icon of the view, written by {@link WorkspaceLeaf.getViewState} as {@link View.getIcon}'s result, or
     * `undefined` when that is empty.
     *
     * Together with {@link ViewState.title} it is what lets a leaf restore the view DEFERRED — with both present
     * {@link WorkspaceLeaf.setViewState} can show a placeholder carrying them instead of building the real view.
     *
     * @unofficial
     */
    icon?: IconName;

    /**
     * Whether the view is pinned.
     *
     * @official
     */
    pinned?: boolean;

    /**
     * The state of the view.
     *
     * @official
     */
    state?: Record<string, unknown>;

    /**
     * The display text of the view, written by {@link WorkspaceLeaf.getViewState} as
     * {@link View.getDisplayText}'s trimmed result, or `undefined` when that is empty. See
     * {@link ViewState.icon} for the deferred-view restore both members feed.
     *
     * @unofficial
     */
    title?: string;

    /**
     * The type of the view.
     *
     * @official
     */
    type: string;
  }
}
