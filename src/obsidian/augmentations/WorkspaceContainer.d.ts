export {};

declare module 'obsidian' {
    /**
     * Workspace container.
     */
    interface WorkspaceContainer extends WorkspaceSplit {
        /**
         * The document object.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link doc} instead.
         */
        doc__: Document;

        /**
         * The window object.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link win} instead.
         */
        win__: Window;
    }
}
