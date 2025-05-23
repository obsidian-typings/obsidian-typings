import type { ViewState } from 'obsidian';
import type { StateHistoryEphemeralState } from './StateHistoryEphemeralState.d.ts';
import type { StateHistoryLeafHistory } from './StateHistoryLeafHistory.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface StateHistory {
    /**
     * Ephemeral cursor state within Editor of leaf.
     */
    eState: StateHistoryEphemeralState;

    /**
     * Icon of the leaf.
     */
    icon?: string;

    /**
     * History of previous and future states of leaf.
     */
    leafHistory?: StateHistoryLeafHistory;

    /**
     * Id of parent to which the leaf belonged.
     */
    parentId?: string;

    /**
     * Id of root to which the leaf belonged.
     */
    rootId?: string;

    /**
     * Last state of the leaf.
     */
    state: ViewState;

    /**
     * Title of the leaf.
     */
    title?: string;
}
