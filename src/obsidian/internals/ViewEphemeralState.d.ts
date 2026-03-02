import type { EditorRangeOrCaret } from 'obsidian';

/**
 * Ephemeral state for a view, storing cursor position and focus information.
 * @public
 * @unofficial
 */
export interface ViewEphemeralState {
    /** Cursor position or selection range in the editor. */
    cursor?: EditorRangeOrCaret;

    /** Whether the view should receive focus. */
    focus: boolean;

    /** Whether the view should receive focus on mobile (may show keyboard). */
    focusOnMobile: boolean;
}
