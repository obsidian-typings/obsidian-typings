import type { EdgeIndexBase } from './EdgeIndexBase.d.ts';
import type { EdgeIndexData } from './EdgeIndexData.d.ts';

/**
 * @public
 * @unofficial
 */
export interface EdgeIndex extends EdgeIndexBase {
    /** @todo Documentation incomplete. */
    _maxEntries: number;

    /** @todo Documentation incomplete. */
    _minEntries: number;

    /** @todo Documentation incomplete. */
    data: EdgeIndexData;

    /** @todo Documentation incomplete. */
    compareMinX(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    compareMinY(arg1: unknown, arg2: unknown): unknown;
}
