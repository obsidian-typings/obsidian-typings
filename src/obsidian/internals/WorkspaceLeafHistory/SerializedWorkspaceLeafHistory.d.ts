import type { WorkspaceLeafHistoryState } from './WorkspaceLeafHistoryState.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface SerializedWorkspaceLeafHistory {
    /** @todo Documentation incomplete. */
    backHistory: WorkspaceLeafHistoryState[];

    /** @todo Documentation incomplete. */
    forwardHistory: WorkspaceLeafHistoryState[];
}
