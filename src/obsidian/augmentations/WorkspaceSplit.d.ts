/** Augmentations for the WorkspaceSplit interface. */
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

        /**
         * Constructor.
         *
         * @param workspace - The workspace.
         * @param direction - The direction.
         * @param id - The id.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<WorkspaceSplit>` or `getWorkspaceSplitConstructor()` instead.
         */
        constructor__(workspace: Workspace, direction: string, id?: string): this;
    }
}
