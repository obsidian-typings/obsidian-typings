import type { WorkspaceLeafHistoryState } from './WorkspaceLeafHistoryState.d.ts';

/**
 * Serialized form of a workspace leaf's navigation history for persistence.
 * @public
 * @unofficial
 */
export interface SerializedWorkspaceLeafHistory {
  /** List of previous navigation states. */
  backHistory: WorkspaceLeafHistoryState[];

  /** List of forward navigation states (after going back). */
  forwardHistory: WorkspaceLeafHistoryState[];
}
