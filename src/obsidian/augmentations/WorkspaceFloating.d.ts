import type { getWorkspaceFloatingConstructor } from '../implementations/constructors/augmentations/getWorkspaceFloatingConstructor.d.ts';

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
         * To get the constructor instance, use {@link getWorkspaceFloatingConstructor} from `obsidian-typings/implementations`.
         *
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(): this;
}
}
