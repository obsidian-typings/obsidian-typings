import type { SerializedWorkspaceItem } from '../internals/Workspace/SerializedWorkspaceItem.d.ts';

declare module 'obsidian' {
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
        detach(): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        getIcon(): IconName;

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
