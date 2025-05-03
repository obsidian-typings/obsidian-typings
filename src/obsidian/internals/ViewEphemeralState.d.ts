import type { EditorRangeOrCaret } from 'obsidian';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface ViewEphemeralState {
    /** @todo Documentation incomplete. */
    cursor?: EditorRangeOrCaret;

    /** @todo Documentation incomplete. */
    focus: boolean;

    /** @todo Documentation incomplete. */
    focusOnMobile: boolean;
}
