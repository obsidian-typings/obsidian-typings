import type { SerializedWorkspaceSidedock } from '../internals/Workspace/SerializedWorkspaceSidedock.d.ts';

declare module 'obsidian' {
    interface WorkspaceSidedock extends WorkspaceSplit {
        /** @unofficial */
        allowSingleChild: boolean;

        /** @unofficial */
        autoManageDOM: boolean;

        /** @unofficial */
        children: WorkspaceTabs[];

        /** @unofficial */
        direction: string;

        /** @unofficial */
        emptyStateEl: HTMLDivElement;

        /** @unofficial */
        isResizing: boolean;

        /** @unofficial */
        originalSizes: null;

        /** @unofficial */
        resizeStartPos: null;

        /** @unofficial */
        side: string;

        /** @unofficial */
        size: number;

        /** @unofficial */
        onSidedockResizeStart(evt: MouseEvent): void;

        /** @unofficial */
        recomputeChildrenDimensions(): void;

        /** @unofficial */
        serialize(): SerializedWorkspaceSidedock;

        /** @unofficial */
        setSize(size: number): void;
    }
}
