import type { SerializedWorkspaceItem } from '../internals/Workspace/SerializedWorkspaceItem.js';

declare module 'obsidian' {
    interface WorkspaceItem extends Events {
        app: App;
        component: Component;
        containerEl: HTMLDivElement;
        dimension: number | null;
        id: string;
        readonly parentSplit?: WorkspaceParent;
        resizeHandleEl: HTMLHRElement;
        type: string;
        workspace: Workspace;

        detach(): void;
        getIcon(): IconName;
        onResizeStart(evt: MouseEvent): void;
        serialize(): SerializedWorkspaceItem;
        setDimension(dimension: number | null): void;
        setParent(parent: WorkspaceParent): void;
    }
}
