import type { SerializedWorkspaceItem } from '../internals/Workspace/SerializedWorkspaceItem.d.ts';

declare module 'obsidian' {
    /**
     * Workspace item.
     * @since 0.10.2
     */
    interface WorkspaceItem extends Events {
        /**
         * Reference to the app instance.
         * @unofficial
         */
        app: App;

        /**
         * The component managing the lifecycle of this workspace item.
         * @unofficial
         */
        component: Component;

        /**
         * Container element for this workspace item.
         * @unofficial
         */
        containerEl: HTMLDivElement;

        /**
         * The flex-grow dimension of this item within its parent split.
         * @unofficial
         */
        dimension: number | null;

        /**
         * Unique identifier for this workspace item.
         * @unofficial
         */
        id: string;

        /**
         * The direct parent of the leaf.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link WorkspaceItem.parent} instead.
         * @since 1.6.6
         */
        parent__: WorkspaceParent;

        /**
         * The resize handle element used for adjusting item dimensions.
         * @unofficial
         */
        resizeHandleEl: HTMLHRElement;

        /**
         * The type identifier for this workspace item (e.g. 'leaf', 'split', 'tabs').
         * @unofficial
         */
        type: string;

        /**
         * Reference to the workspace this item belongs to.
         * @unofficial
         */
        workspace: Workspace;

        /**
         * The parent split containing this item.
         * @unofficial
         */
        get parentSplit(): WorkspaceParent;

        /**
         * Detach this item from its parent.
         * @unofficial
         */
        detach(): void;

        /**
         * Get the root container parent item, which can be one of:.
         * - {@link WorkspaceRoot}
         * - {@link WorkspaceWindow}
         *
         * @official
         * @since 0.15.4
         */
        getContainer(): WorkspaceContainer;

        /**
         * Get the icon name for this workspace item.
         * @unofficial
         */
        getIcon(): IconName;

        /**
         * Get the root item.
         *
         * @official
         * @since 0.10.2
         */
        getRoot(): WorkspaceItem;

        /**
         * Handle the start of a resize operation on this item.
         * @unofficial
         */
        onResizeStart(evt: MouseEvent): void;

        /**
         * Serialize this workspace item's state for persistence.
         * @unofficial
         */
        serialize(): SerializedWorkspaceItem;

        /**
         * Set the flex-grow dimension of this item within its parent split.
         * @unofficial
         */
        setDimension(dimension: number | null): void;

        /**
         * Set the parent split for this workspace item.
         * @unofficial
         */
        setParent(parent: WorkspaceParent): void;
    }
}
