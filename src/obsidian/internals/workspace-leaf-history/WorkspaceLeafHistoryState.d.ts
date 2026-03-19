import type { IconName } from 'obsidian';

/**
 * A single state entry in a workspace leaf's navigation history.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceLeafHistoryState {
  /** Ephemeral editor state (cursor position, scroll, etc.). */
  eState: unknown;

  /** Icon associated with this history entry. */
  icon: IconName;

  /** View state data for this history entry. */
  state: unknown;

  /** Display title for this history entry. */
  title: string;
}
