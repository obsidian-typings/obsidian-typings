import type { EditorRange } from 'obsidian';

/**
 * Ephemeral state for the markdown edit view, storing cursor position.
 *
 * @public
 * @unofficial
 */
export interface MarkdownEditViewEphemeralState {
  /** Current cursor selection range in the editor. */
  cursor: EditorRange;
}
