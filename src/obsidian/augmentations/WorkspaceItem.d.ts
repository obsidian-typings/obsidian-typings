import type { SerializedWorkspaceItem } from '../internals/Workspace/SerializedWorkspaceItem.d.ts';

declare module 'obsidian' {
    interface WorkspaceItem extends Events {
        /** @unofficial */
        app: App;

        /** @unofficial */
        component: Component;

        /** @unofficial */
        containerEl: HTMLDivElement;

        /** @unofficial */
        dimension: number | null;

        /** @unofficial */
        id: string;

        /** @unofficial */
        resizeHandleEl: HTMLHRElement;

        /** @unofficial */
        type: string;

        /** @unofficial */
        workspace: Workspace;

        /** @unofficial */
        detach(): void;

        /** @unofficial */
        getIcon(): IconName;

        /** @unofficial */
        onResizeStart(evt: MouseEvent): void;

        /** @unofficial */
        serialize(): SerializedWorkspaceItem;

        /** @unofficial */
        setDimension(dimension: number | null): void;

        /** @unofficial */
        setParent(parent: WorkspaceParent): void;
    }
}
