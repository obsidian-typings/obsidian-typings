import type {
    getWorkspaceRibbonConstructor
} from '../implementations/constructors/augmentations/getWorkspaceRibbonConstructor.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Workspace ribbon.
     */
    interface WorkspaceRibbon {
        /**
         * Constructor.
         *
         * To get the constructor instance, use {@link getWorkspaceRibbonConstructor} from `obsidian-typings/implementations`.
         *
         * @param workspace - The workspace.
         * @param side - The side.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor2__(workspace: Workspace, side: string): this;
    }
}
