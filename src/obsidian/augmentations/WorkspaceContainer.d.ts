export {};

declare module 'obsidian' {
  /**
   * Workspace container.
   *
   * @since 0.15.4
   */
  interface WorkspaceContainer extends WorkspaceSplit {
    /**
     * The document object.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link doc} instead.
     * @since 0.15.4
     */
    doc__?: Document;

    /**
     * The window object.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link win} instead.
     * @since 0.15.4
     */
    win__?: Window;

    /**
     * Focuses the container's window (restoring it first if minimized, on desktop).
     *
     * @unofficial
     */
    focus(): void;

    /**
     * Handles the container's window gaining focus, updating the active leaf.
     *
     * @unofficial
     */
    onFocus(): void;
  }
}
