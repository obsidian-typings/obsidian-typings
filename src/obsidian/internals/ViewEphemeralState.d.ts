import type { EditorRangeOrCaret } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface ViewEphemeralState {
    cursor?: EditorRangeOrCaret;
    focus: boolean;
    focusOnMobile: boolean;
}
