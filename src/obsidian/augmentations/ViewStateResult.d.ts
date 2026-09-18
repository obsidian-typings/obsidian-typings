export {};

declare module 'obsidian' {
  /**
   * The result of the view state.
   */
  interface ViewStateResult {
    /**
     * Set this to `true` to indicate that the view cannot show what it was given, so the leaf should put its empty
     * view back. {@link FileView.setState} sets it whenever the view is left with no file and
     * {@link FileView.allowNoFile} is off, and {@link WorkspaceLeaf.setViewState} answers it by opening the leaf's
     * empty view.
     *
     * {@link WorkspaceLeaf.setViewState} initializes it to `false`, so a {@link View.setState} implementation is
     * always handed it already present.
     *
     * @unofficial
     */
    close?: boolean;

    /**
     * Set this to `true` to indicate that there is a state change which should be recorded in the navigation history.
     *
     * @official
     */
    history: boolean;

    /**
     * Set this to `true` to indicate that the state change alters the layout. {@link FileView.setState} sets it
     * alongside {@link ViewStateResult.history} whenever the loaded file actually changed, and
     * {@link WorkspaceLeaf.setViewState} answers it with {@link Workspace.onLayoutChange}.
     *
     * {@link WorkspaceLeaf.setViewState} initializes it to `false`, so a {@link View.setState} implementation is
     * always handed it already present.
     *
     * @unofficial
     */
    layout?: boolean;

    /**
     * A callback the leaf runs last, after the navigation history has been recorded.
     * {@link FileView.setState} sets it to `() => this.syncState()`, which is the linked-pane follow.
     *
     * Unlike the other three members this one is never initialized — it is absent until a view assigns it.
     *
     * @unofficial
     */
    done?(): void;
  }
}
