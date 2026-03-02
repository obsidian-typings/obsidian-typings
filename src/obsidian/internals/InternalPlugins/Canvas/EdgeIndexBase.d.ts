import type { EdgeIndexBaseBase } from './EdgeIndexBaseBase.d.ts';

/**
 * Base interface for the spatial edge index, extending the R-tree with custom insert/remove behavior.
 * @public
 * @unofficial
 */
export interface EdgeIndexBase extends EdgeIndexBaseBase {
    /** Insert an item into the spatial index. */
    insert(arg1: unknown): unknown;

    /** Remove an item from the spatial index. */
    remove(arg1: unknown): unknown;

    /** Convert an item to its bounding box representation. */
    toBBox(arg1: unknown): unknown;
}
