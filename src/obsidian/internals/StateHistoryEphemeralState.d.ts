import type { EditorRange } from 'obsidian';

/**
 * Ephemeral editor state stored in the state history (cursor and scroll position).
 *
 * @public
 * @unofficial
 */
export interface StateHistoryEphemeralState {
  /** Cursor selection range in the editor. */
  cursor: EditorRange;

  /** Scroll position in the editor. */
  scroll: number;
}
