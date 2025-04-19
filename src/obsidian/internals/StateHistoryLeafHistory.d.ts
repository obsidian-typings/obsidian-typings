import type { StateHistory } from './StateHistory.d.ts';

/** @public @unofficial */
export interface StateHistoryLeafHistory {
    backHistory: StateHistory[];
    forwardHistory: StateHistory[];
}
