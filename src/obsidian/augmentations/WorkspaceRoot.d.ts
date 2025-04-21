export {};

declare module 'obsidian' {
    /**
     * Workspace root.
     */
    interface WorkspaceRoot extends WorkspaceContainer {
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
