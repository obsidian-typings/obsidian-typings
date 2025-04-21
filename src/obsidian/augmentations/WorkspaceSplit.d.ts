/** @todo Documentation incomplete */
export {};

declare module 'obsidian' {
    /**
     * Workspace split.
     */
    interface WorkspaceSplit extends WorkspaceParent {
        /**
         * The parent of the split.
         *
         * @official
         */
        parent: WorkspaceParent;
    }
}
