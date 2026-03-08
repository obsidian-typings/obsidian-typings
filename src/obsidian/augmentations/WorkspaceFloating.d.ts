export {};

declare module 'obsidian' {
    /**
     * Workspace floating.
     * @since 0.15.2
     */
    interface WorkspaceFloating extends WorkspaceParent {
        /**
         * The parent of the floating.
         *
         * @official
         * @since 0.15.2
         */
        parent: WorkspaceParent;
    
        /**
         * Constructor.
         *
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(): this;
}
}
