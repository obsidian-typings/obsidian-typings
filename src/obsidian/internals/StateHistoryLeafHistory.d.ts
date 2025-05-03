import type { StateHistory } from './StateHistory.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface StateHistoryLeafHistory {
    /** @todo Documentation incomplete. */
    backHistory: StateHistory[];

    /** @todo Documentation incomplete. */
    forwardHistory: StateHistory[];
}
