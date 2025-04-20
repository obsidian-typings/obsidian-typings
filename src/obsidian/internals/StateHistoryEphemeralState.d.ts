import type { EditorRange } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface StateHistoryEphemeralState {
    /**
     * @todo Documentation incomplete.
     */
    cursor: EditorRange;

    /**
     * @todo Documentation incomplete.
     */
    scroll: number;
}
