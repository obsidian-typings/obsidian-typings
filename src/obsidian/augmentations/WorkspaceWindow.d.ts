export {};

declare module 'obsidian' {
    /**
     * Workspace window.
     * @since 0.15.4
     */
    interface WorkspaceWindow extends WorkspaceContainer {
        /**
         * The document object.
         *
         * @official
         */
        doc: Document;

        /**
         * The window object.
         *
         * @official
         */
        win: Window;
    }
}
