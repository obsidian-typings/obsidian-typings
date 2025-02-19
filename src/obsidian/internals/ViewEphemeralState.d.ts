import type { EditorRangeOrCaret } from 'obsidian';

/** @public */
export interface ViewEphemeralState {
    cursor?: EditorRangeOrCaret;
    focus: boolean;
    focusOnMobile: boolean;
}
