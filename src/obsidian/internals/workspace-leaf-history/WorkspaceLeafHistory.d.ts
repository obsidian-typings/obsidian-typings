import type { WorkspaceLeaf } from 'obsidian';
import type { SerializedWorkspaceLeafHistory } from './SerializedWorkspaceLeafHistory.d.ts';
import type { WorkspaceLeafHistoryState } from './WorkspaceLeafHistoryState.d.ts';

/**
 * Navigation history for a workspace leaf, supporting back/forward navigation.
 * @public
 * @unofficial
 */
export interface WorkspaceLeafHistory {
    /**
     * Navigate back to the previous state.
     *
     * @returns A promise that resolves when navigation is complete.
     */
    back(): Promise<void>;

    /** List of previous navigation states. */
    backHistory: WorkspaceLeafHistoryState[];

    /**
     * Restore history from a serialized representation.
     *
     * @param e - The serialized history data.
     */
    deserialize(e: SerializedWorkspaceLeafHistory): void;

    /**
     * Navigate forward to the next state.
     *
     * @returns A promise that resolves when navigation is complete.
     */
    forward(): Promise<void>;

    /** List of forward navigation states (after going back). */
    forwardHistory: WorkspaceLeafHistoryState[];

    /**
     * Navigate by the given number of steps (negative for back, positive for forward).
     *
     * @param step - The number of steps to navigate.
     * @returns A promise that resolves when navigation is complete.
     */
    go(step: number): Promise<void>;

    /** The workspace leaf that owns this history. */
    owner: WorkspaceLeaf;

    /**
     * Push a new state onto the back history stack.
     *
     * @param state - The history state to push.
     */
    pushState(state: WorkspaceLeafHistoryState): void;

    /**
     * Serialize the history for persistence.
     *
     * @returns The serialized history data.
     */
    serialize(): SerializedWorkspaceLeafHistory;

    /**
     * Update the current state in the history.
     *
     * @param state - The history state to update with.
     * @returns A promise that resolves when the state is updated.
     */
    updateState(state: WorkspaceLeafHistoryState): Promise<void>;
}
