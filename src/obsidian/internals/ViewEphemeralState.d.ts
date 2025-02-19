import type { EditorRangeOrCaret } from 'obsidian';

/** @public */
export interface ViewEphemeralState {
    focus: boolean;
    focusOnMobile: boolean;
    cursor?: EditorRangeOrCaret;
}
