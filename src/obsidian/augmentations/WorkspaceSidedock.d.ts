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
         * Collapse the sidedock.
         *
         * @official
         * @since 0.12.11
         */
        collapse(): void;

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
         * Expand the sidedock.
         *
         * @official
         * @since 0.12.11
         */
        expand(): void;

        /**
         * Whether the sidedock is currently being resized.
         * @unofficial
         */
        isResizing: boolean;

        /**
         * Handle the start of a sidedock resize operation.
         *
         * @param evt - The mouse event that initiated the resize.
         * @unofficial
         */
        onSidedockResizeStart(evt: MouseEvent): void;

        /**
         * Original sizes of children before a resize operation.
         * @unofficial
         */
        originalSizes: null;

        /**
         * Recalculate the dimensions of child tab groups.
         * @unofficial
         */
        recomputeChildrenDimensions(): void;

        /**
         * Starting position of the current resize operation.
         * @unofficial
         */
        resizeStartPos: null;

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
         * Toggle the sidedock.
         *
         * @official
         * @since 0.12.11
         */
        toggle(): void;
    }
}
