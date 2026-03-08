import type { SerializedWorkspaceItem } from './SerializedWorkspaceItem.d.ts';

/**
 * Serialized representation of a workspace sidedock (left or right sidebar).
 * @public
 * @unofficial
 */
export interface SerializedWorkspaceSidedock extends SerializedWorkspaceItem {
    /** Whether the sidedock is collapsed. */
    collapsed: boolean;

    /** Width of the sidedock in pixels. */
    width: number;
}
