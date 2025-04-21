export {};

declare module 'obsidian' {
    /**
     * Workspace floating.
     */
    interface WorkspaceFloating extends WorkspaceParent {
        /**
         * The parent of the floating.
         *
         * @official
         */
        parent: WorkspaceParent;
    }
}
