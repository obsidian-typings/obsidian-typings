import type { SerializedWorkspaceItem } from './SerializedWorkspaceItem.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface SerializedWorkspaceSidedock extends SerializedWorkspaceItem {
    /** @todo Documentation incomplete. */
    collapsed: boolean;

    /** @todo Documentation incomplete. */
    width: number;
}
