import type { SerializedWorkspaceItem } from './SerializedWorkspaceItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface SerializedWorkspaceSidedock extends SerializedWorkspaceItem {
    collapsed: boolean;
    width: number;
}
