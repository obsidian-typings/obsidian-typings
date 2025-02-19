import type { EditorRange } from 'obsidian';

/** @public */
export interface StateHistoryEphemeralState {
    cursor: EditorRange;
    scroll: number;
}
