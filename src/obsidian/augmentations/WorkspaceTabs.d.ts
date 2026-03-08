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
         * To get the constructor, use `getWorkspaceTabsConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         */
        constructor__(workspace: Workspace, id?: string): this;
}
}
