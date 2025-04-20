import type { StateHistory } from './StateHistory.d.ts';

/**
 * @public
 * @unofficial
 */
export interface StateHistoryLeafHistory {
    /**
     * @todo Documentation incomplete.
     */
    backHistory: StateHistory[];

    /**
     * @todo Documentation incomplete.
     */
    forwardHistory: StateHistory[];
}
