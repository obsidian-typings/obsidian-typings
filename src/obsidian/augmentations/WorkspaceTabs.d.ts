export {};

declare module 'obsidian' {
    /**
     * Workspace tabs.
     */
    interface WorkspaceTabs extends WorkspaceParent {
        /**
         * The parent of the tabs.
         *
         * @official
         */
        parent: WorkspaceSplit;
    
        /**
         * Constructor.
         *
         * @param workspace - The workspace.
         * @param id - The id.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<WorkspaceTabs>` or `getWorkspaceTabsConstructor()` instead.
         */
        constructor__(workspace: Workspace, id?: string): this;
}
}
