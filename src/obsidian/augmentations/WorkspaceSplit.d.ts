/** @todo Documentation incomplete */
export {};

declare module 'obsidian' {
    /**
     * Workspace split.
     * @since 0.9.7
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
