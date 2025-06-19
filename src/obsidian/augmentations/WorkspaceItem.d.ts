import type { SerializedWorkspaceItem } from '../internals/Workspace/SerializedWorkspaceItem.d.ts';

declare module 'obsidian' {
    /**
     * Workspace item.
     */
    interface WorkspaceItem extends Events {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        app: App;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        component: Component;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        containerEl: HTMLDivElement;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        dimension: number | null;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        id: string;

        /**
         * The direct parent of the leaf.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link WorkspaceItem.parent} instead.
         */
        parent__: WorkspaceParent;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        resizeHandleEl: HTMLHRElement;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        type: string;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        workspace: Workspace;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        get parentSplit(): WorkspaceParent;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        detach(): void;

        /**
         * Get the root container parent item, which can be one of:.
         * - {@link WorkspaceRoot}
         * - {@link WorkspaceWindow}
         *
         * @official
         */
        getContainer(): WorkspaceContainer;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        getIcon(): IconName;

        /**
         * Get the root item.
         *
         * @official
         */
        getRoot(): WorkspaceItem;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onResizeStart(evt: MouseEvent): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        serialize(): SerializedWorkspaceItem;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        setDimension(dimension: number | null): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        setParent(parent: WorkspaceParent): void;
    }
}
