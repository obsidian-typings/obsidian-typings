import type { EdgeIndexBaseBase } from './EdgeIndexBaseBase.d.ts';

/**
 * Base interface for the spatial edge index, extending the R-tree with custom insert/remove behavior.
 * @public
 * @unofficial
 */
export interface EdgeIndexBase extends EdgeIndexBaseBase {
    /**
     * Insert an item into the spatial index.
     *
     * @returns The updated index.
     */
    insert(arg1: unknown): unknown;

    /**
     * Remove an item from the spatial index.
     *
     * @returns The updated index.
     */
    remove(arg1: unknown): unknown;

    /**
     * Convert an item to its bounding box representation.
     *
     * @returns The bounding box.
     */
    toBBox(arg1: unknown): unknown;
}
