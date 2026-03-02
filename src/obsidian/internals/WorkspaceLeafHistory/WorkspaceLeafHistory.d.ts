import type { WorkspaceLeaf } from 'obsidian';
import type { SerializedWorkspaceLeafHistory } from './SerializedWorkspaceLeafHistory.d.ts';
import type { WorkspaceLeafHistoryState } from './WorkspaceLeafHistoryState.d.ts';

/**
 * Navigation history for a workspace leaf, supporting back/forward navigation.
 * @public
 * @unofficial
 */
export interface WorkspaceLeafHistory {
    /** List of previous navigation states. */
    backHistory: WorkspaceLeafHistoryState[];

    /** List of forward navigation states (after going back). */
    forwardHistory: WorkspaceLeafHistoryState[];

    /** The workspace leaf that owns this history. */
    owner: WorkspaceLeaf;

    /** Navigate back to the previous state. */
    back(): Promise<void>;

    /** Restore history from a serialized representation. */
    deserialize(e: SerializedWorkspaceLeafHistory): void;

    /** Navigate forward to the next state. */
    forward(): Promise<void>;

    /** Navigate by the given number of steps (negative for back, positive for forward). */
    go(step: number): Promise<void>;

    /** Push a new state onto the back history stack. */
    pushState(state: WorkspaceLeafHistoryState): void;

    /** Serialize the history for persistence. */
    serialize(): SerializedWorkspaceLeafHistory;

    /** Update the current state in the history. */
    updateState(state: WorkspaceLeafHistoryState): Promise<void>;
}
