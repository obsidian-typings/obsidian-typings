import type { SerializedWorkspaceItem } from './SerializedWorkspaceItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface SerializedWorkspaceSidedock extends SerializedWorkspaceItem {
    /** @todo Documentation incomplete. */
    collapsed: boolean;

    /** @todo Documentation incomplete. */
    width: number;
}
