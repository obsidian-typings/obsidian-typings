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
         * To get the constructor, use `getWorkspaceRibbonConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         */
        constructor__(workspace: Workspace, side: string): this;
}
}
