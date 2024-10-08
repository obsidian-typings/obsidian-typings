import type { SerializedWorkspaceItem } from './SerializedWorkspaceItem.js';

/** @public */
export interface SerializedWorkspaceSidedock extends SerializedWorkspaceItem {
    collapsed: boolean;
    width: number;
}
