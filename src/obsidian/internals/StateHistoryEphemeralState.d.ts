import type { EditorRange } from 'obsidian';

/** @public @unofficial */
export interface StateHistoryEphemeralState {
    cursor: EditorRange;
    scroll: number;
}
