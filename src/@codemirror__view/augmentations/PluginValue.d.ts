export {};

declare module '@codemirror/view' {
  interface PluginValue {
    /**
     * Called when the plugin is no longer going to be used. Should revert any changes the plugin
     * made to the DOM.
     *
     * @official
     */
    destroy?(): void;

    /**
     * Called when the document view is updated (due to content, decoration, or viewport changes).
     *
     * @param view - The editor view.
     * @official
     */
    docViewUpdate?(view: EditorView): void;

    /**
     * Notifies the plugin of an update that happened in the view.
     *
     * @param update - The view update.
     * @official
     */
    update?(update: ViewUpdate): void;
  }
}
