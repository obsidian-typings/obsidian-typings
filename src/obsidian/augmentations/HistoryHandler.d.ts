export {};

declare module 'obsidian' {
  /**
   * A handler that responds to history navigation, e.g. the Android 'back' button.
   */
  interface HistoryHandler {
    /**
     * Called when the user navigates back in the history.
     *
     * @official
     */
    onHistoryBack(): void;

    /**
     * Called when the user navigates forward in the history.
     *
     * @official
     */
    onHistoryForward?(): void;
  }
}
