import type { WorkspaceLeaf } from 'obsidian';
import type { SerializedWorkspaceLeafHistory } from './SerializedWorkspaceLeafHistory.d.ts';
import type { WorkspaceLeafHistoryState } from './WorkspaceLeafHistoryState.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface WorkspaceLeafHistory {
    /** @todo Documentation incomplete. */
    backHistory: WorkspaceLeafHistoryState[];

    /** @todo Documentation incomplete. */
    forwardHistory: WorkspaceLeafHistoryState[];

    /** @todo Documentation incomplete. */
    owner: WorkspaceLeaf;

    /** @todo Documentation incomplete. */
    back(): Promise<void>;

    /** @todo Documentation incomplete. */
    deserialize(e: SerializedWorkspaceLeafHistory): void;

    /** @todo Documentation incomplete. */
    forward(): Promise<void>;

    /** @todo Documentation incomplete. */
    go(step: number): Promise<void>;

    /** @todo Documentation incomplete. */
    pushState(state: WorkspaceLeafHistoryState): void;

    /** @todo Documentation incomplete. */
    serialize(): SerializedWorkspaceLeafHistory;

    /** @todo Documentation incomplete. */
    updateState(state: WorkspaceLeafHistoryState): Promise<void>;
}
