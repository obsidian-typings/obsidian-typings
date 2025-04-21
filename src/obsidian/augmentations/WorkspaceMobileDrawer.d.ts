export {};

declare module 'obsidian' {
    /**
     * Workspace mobile drawer.
     */
    interface WorkspaceMobileDrawer extends WorkspaceParent {
        /**
         * Whether the mobile drawer is collapsed.
         *
         * @official
         */
        collapsed: boolean;

        /**
         * The parent of the mobile drawer.
         *
         * @official
         */
        parent: WorkspaceParent;

        /**
         * Collapse the mobile drawer.
         *
         * @official
         */
        collapse(): void;

        /**
         * Expand the mobile drawer.
         *
         * @official
         */
        expand(): void;

        /**
         * Toggle the mobile drawer.
         *
         * @official
         */
        toggle(): void;
    }
}
