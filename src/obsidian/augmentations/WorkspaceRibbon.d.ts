export {};

declare module 'obsidian' {
    /**
     * Workspace ribbon.
     */
    interface WorkspaceRibbon {
    
        /**
         * Constructor.
         *
         * @param workspace - The workspace.
         * @param side - The side.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<WorkspaceRibbon>` or `getWorkspaceRibbonConstructor()` instead.
         */
        constructor__(workspace: Workspace, side: string): this;
}
}
