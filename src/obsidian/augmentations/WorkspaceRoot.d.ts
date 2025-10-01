export {};

declare module 'obsidian' {
    /**
     * Workspace root.
     * @since 0.15.2
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
