import type { StateHistory } from './StateHistory.d.ts';

/** @public */
export interface StateHistoryLeafHistory {
    backHistory: StateHistory[];
    forwardHistory: StateHistory[];
}
