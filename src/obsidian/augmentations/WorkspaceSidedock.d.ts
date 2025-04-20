import type { SerializedWorkspaceSidedock } from '../internals/Workspace/SerializedWorkspaceSidedock.d.ts';

declare module 'obsidian' {
    interface WorkspaceSidedock extends WorkspaceSplit {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        allowSingleChild: boolean;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        autoManageDOM: boolean;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        children: WorkspaceTabs[];

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        direction: string;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        emptyStateEl: HTMLDivElement;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        isResizing: boolean;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        originalSizes: null;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        resizeStartPos: null;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        side: string;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        size: number;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onSidedockResizeStart(evt: MouseEvent): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        recomputeChildrenDimensions(): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        serialize(): SerializedWorkspaceSidedock;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        setSize(size: number): void;
    }
}
