export {};

declare module 'obsidian' {
    /**
     * Workspace window.
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
