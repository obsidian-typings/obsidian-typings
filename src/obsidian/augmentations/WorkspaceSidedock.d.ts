import type { SerializedWorkspaceSidedock } from '../internals/Workspace/SerializedWorkspaceSidedock.d.ts';

declare module 'obsidian' {
    interface WorkspaceSidedock extends WorkspaceSplit {
        allowSingleChild: boolean;
        autoManageDOM: boolean;
        children: WorkspaceTabs[];
        direction: string;
        emptyStateEl: HTMLDivElement;
        isResizing: boolean;
        originalSizes: null;
        resizeStartPos: null;
        side: string;
        size: number;

        onSidedockResizeStart(evt: MouseEvent): void;
        recomputeChildrenDimensions(): void;
        serialize(): SerializedWorkspaceSidedock;
        setSize(size: number): void;
    }
}
