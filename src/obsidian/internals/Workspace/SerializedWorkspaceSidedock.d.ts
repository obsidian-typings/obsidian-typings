import type { SerializedWorkspaceItem } from './SerializedWorkspaceItem.d.ts';

/** @public */
export interface SerializedWorkspaceSidedock extends SerializedWorkspaceItem {
    collapsed: boolean;
    width: number;
}
