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
    }
}
