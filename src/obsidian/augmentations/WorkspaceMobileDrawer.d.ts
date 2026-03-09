import type { getWorkspaceMobileDrawerConstructor } from '../implementations/constructors/augmentations/getWorkspaceMobileDrawerConstructor.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Workspace mobile drawer.
     * @since 1.6.6
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
         * Constructor.
         *
         * To get the constructor instance, use {@link getWorkspaceMobileDrawerConstructor} from `obsidian-typings/implementations`.
         *
         * @returns The new instance.
         * @remark Constructor is `null`. See {@link https://forum.obsidian.md/t/api-bug-tasks-class/98993}.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor3__(): this;

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
