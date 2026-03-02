/**
 * R-tree spatial index base implementation for efficient spatial queries on canvas elements.
 * @public
 * @unofficial
 */
export interface EdgeIndexBaseBase {
    /**
     * Adjust parent bounding boxes after an insertion or modification.
     *
     * @returns The result of adjusting parent bounding boxes.
     */
    _adjustParentBBoxes(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /**
     * Traverse all items in the tree, calling the callback for each.
     *
     * @returns The result of traversing all items.
     */
    _all(arg1: unknown, arg2: unknown): unknown;

    /**
     * Calculate the distribution margin for all possible splits along an axis.
     *
     * @returns The distribution margin.
     */
    _allDistMargin(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /**
     * Build the R-tree from a set of items.
     *
     * @returns The built R-tree node.
     */
    _build(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /**
     * Choose the best axis for splitting an overflowing node.
     *
     * @returns The result of choosing the split axis.
     */
    _chooseSplitAxis(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /**
     * Choose the best split index along the chosen axis.
     *
     * @returns The best split index.
     */
    _chooseSplitIndex(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /**
     * Choose the best subtree for inserting a new item.
     *
     * @returns The chosen subtree.
     */
    _chooseSubtree(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /**
     * Condense the tree by removing empty branches after a deletion.
     *
     * @returns The result of condensing the tree.
     */
    _condense(arg1: unknown): unknown;

    /**
     * Internal insert method that places an item at the specified tree level.
     *
     * @returns The result of inserting the item.
     */
    _insert(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /**
     * Split an overflowing tree node into two nodes.
     *
     * @returns The result of splitting the node.
     */
    _split(arg1: unknown, arg2: unknown): unknown;

    /**
     * Split the root node when it overflows.
     *
     * @returns The result of splitting the root.
     */
    _splitRoot(arg1: unknown, arg2: unknown): unknown;

    /**
     * Return all items stored in the index.
     *
     * @returns All items in the index.
     */
    all(): unknown;

    /**
     * Remove all items from the index.
     *
     * @returns The cleared index.
     */
    clear(): unknown;

    /**
     * Check whether any items in the index collide with the given bounding box.
     *
     * @returns Whether a collision was found.
     */
    collides(arg1: unknown): unknown;

    /**
     * Compare two items by their minimum X coordinate for sorting.
     *
     * @returns The comparison result.
     */
    compareMinX(arg1: unknown, arg2: unknown): unknown;

    /**
     * Compare two items by their minimum Y coordinate for sorting.
     *
     * @returns The comparison result.
     */
    compareMinY(arg1: unknown, arg2: unknown): unknown;

    /**
     * Load the index state from a JSON representation.
     *
     * @returns The loaded index.
     */
    fromJSON(arg1: unknown): unknown;

    /**
     * Insert an item into the spatial index.
     *
     * @returns The updated index.
     */
    insert(arg1: unknown): unknown;

    /**
     * Bulk-load a set of items into the index.
     *
     * @returns The updated index.
     */
    load(arg1: unknown): unknown;

    /**
     * Remove an item from the index, optionally using a custom equality function.
     *
     * @returns The updated index.
     */
    remove(arg1: unknown, arg2: unknown): unknown;

    /**
     * Search for all items that intersect the given bounding box.
     *
     * @returns The matching items.
     */
    search(arg1: unknown): unknown;

    /**
     * Convert an item to its bounding box representation.
     *
     * @returns The bounding box.
     */
    toBBox(arg1: unknown): unknown;

    /**
     * Serialize the index state to a JSON representation.
     *
     * @returns The JSON representation.
     */
    toJSON(): unknown;
}
