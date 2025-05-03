import type { EditorRange } from 'obsidian';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface StateHistoryEphemeralState {
    /** @todo Documentation incomplete. */
    cursor: EditorRange;

    /** @todo Documentation incomplete. */
    scroll: number;
}
