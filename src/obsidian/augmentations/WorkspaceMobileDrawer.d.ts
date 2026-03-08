export {};

declare module 'obsidian' {
    /**
     * Workspace mobile drawer.
     * @since 1.6.6
     */
    interface WorkspaceMobileDrawer extends WorkspaceParent {
        /**
         * Collapse the mobile drawer.
         *
         * @official
         */
        collapse(): void;

        /**
         * Whether the mobile drawer is collapsed.
         *
         * @official
         */
        collapsed: boolean;

        /**
         * Expand the mobile drawer.
         *
         * @official
         */
        expand(): void;

        /**
         * The parent of the mobile drawer.
         *
         * @official
         */
        parent: WorkspaceParent;

        /**
         * Toggle the mobile drawer.
         *
         * @official
         */
        toggle(): void;
    }
}
