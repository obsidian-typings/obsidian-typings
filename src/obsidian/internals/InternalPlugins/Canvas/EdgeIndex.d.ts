import type { EdgeIndexBase } from './EdgeIndexBase.d.ts';
import type { EdgeIndexData } from './EdgeIndexData.d.ts';

/**
 * @public
 * @unofficial
 */
export interface EdgeIndex extends EdgeIndexBase {
    _maxEntries: number;
    _minEntries: number;
    data: EdgeIndexData;

    compareMinX(arg1: unknown, arg2: unknown): unknown;
    compareMinY(arg1: unknown, arg2: unknown): unknown;
}
