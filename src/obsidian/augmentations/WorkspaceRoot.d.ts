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
    
        /**
         * Constructor.
         *
         * @param workspace - The workspace.
         * @param direction - The direction.
         * @param id - The id.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<WorkspaceRoot>` or `getWorkspaceRootConstructor()` instead.
         */
        constructor__(workspace: Workspace, direction: string, id?: string): this;
}
}
