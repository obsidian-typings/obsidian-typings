import type {
    getWorkspaceSidedockConstructor
} from '../implementations/constructors/augmentations/getWorkspaceSidedockConstructor.d.ts';
import type { SerializedWorkspaceSidedock } from '../internals/workspace/SerializedWorkspaceSidedock.d.ts';

declare module 'obsidian' {
    /**
     * Workspace sidedock.
     * @since 0.15.4
     */
    interface WorkspaceSidedock extends WorkspaceSplit {
        /**
         * Whether the sidedock allows only a single child tab group.
         * @unofficial
         */
        allowSingleChild: boolean;

        /**
         * Whether the sidedock automatically manages its DOM elements.
         * @unofficial
         */
        autoManageDOM: boolean;

        /**
         * Child tab groups within this sidedock.
         * @unofficial
         */
        children: WorkspaceTabs[];

        /**
         * Whether the sidedock is collapsed.
         *
         * @official
         * @since 0.12.11
         */
        collapsed: boolean;

        /**
         * Layout direction of the sidedock split.
         * @unofficial
         */
        direction: string;

        /**
         * Element displayed when the sidedock has no content.
         * @unofficial
         */
        emptyStateEl: HTMLDivElement;

        /**
         * Whether the sidedock is currently being resized.
         * @unofficial
         */
        isResizing: boolean;

        /**
         * Original sizes of children before a resize operation.
         * @unofficial
         */
        originalSizes: null;

        /**
         * Starting position of the current resize operation.
         * @unofficial
         */
        resizeStartPos: null;

        /**
         * Which side of the workspace this sidedock is on (e.g. 'left' or 'right').
         * @unofficial
         */
        side: string;

        /**
         * Width of the sidedock in pixels.
         * @unofficial
         */
        size: number;

        /**
         * Collapse the sidedock.
         *
         * @official
         * @since 0.12.11
         */
        collapse(): void;

        /**
         * Constructor.
         *
         * To get the constructor instance, use {@link getWorkspaceSidedockConstructor} from `obsidian-typings/implementations`.
         *
         * @param workspace - The workspace.
         * @param direction - The direction.
         * @param side - The side.
         * @param id - The id.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor4__(workspace: Workspace, direction: string, side: string, id?: string): this;

        /**
         * Expand the sidedock.
         *
         * @official
         * @since 0.12.11
         */
        expand(): void;

        /**
         * Handle the start of a sidedock resize operation.
         *
         * @param evt - The mouse event that initiated the resize.
         * @unofficial
         */
        onSidedockResizeStart(evt: MouseEvent): void;

        /**
         * Recalculate the dimensions of child tab groups.
         * @unofficial
         */
        recomputeChildrenDimensions(): void;

        /**
         * Serialize the sidedock state for persistence.
         *
         * @returns The serialized sidedock state.
         * @unofficial
         */
        serialize(): SerializedWorkspaceSidedock;

        /**
         * Set the width of the sidedock in pixels.
         *
         * @param size - The width in pixels.
         * @unofficial
         */
        setSize(size: number): void;

        /**
         * Toggle the sidedock.
         *
         * @official
         * @since 0.12.11
         */
        toggle(): void;
    }
}
