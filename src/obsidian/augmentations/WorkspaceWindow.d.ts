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
    
        /**
         * Constructor.
         *
         * @param workspace - The workspace.
         * @param id - The id.
         * @param size - The size.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<WorkspaceWindow>` or `getWorkspaceWindowConstructor()` instead.
         */
        constructor2__(workspace: Workspace, id?: string, size?: Record<string, number>): this;
}
}
