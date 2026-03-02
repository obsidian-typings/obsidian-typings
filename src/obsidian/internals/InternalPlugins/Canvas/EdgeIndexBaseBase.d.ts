/**
 * R-tree spatial index base implementation for efficient spatial queries on canvas elements.
 * @public
 * @unofficial
 */
export interface EdgeIndexBaseBase {
    /** Adjust parent bounding boxes after an insertion or modification. */
    _adjustParentBBoxes(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** Traverse all items in the tree, calling the callback for each. */
    _all(arg1: unknown, arg2: unknown): unknown;

    /** Calculate the distribution margin for all possible splits along an axis. */
    _allDistMargin(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /** Build the R-tree from a set of items. */
    _build(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /** Choose the best axis for splitting an overflowing node. */
    _chooseSplitAxis(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** Choose the best split index along the chosen axis. */
    _chooseSplitIndex(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** Choose the best subtree for inserting a new item. */
    _chooseSubtree(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /** Condense the tree by removing empty branches after a deletion. */
    _condense(arg1: unknown): unknown;

    /** Internal insert method that places an item at the specified tree level. */
    _insert(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** Split an overflowing tree node into two nodes. */
    _split(arg1: unknown, arg2: unknown): unknown;

    /** Split the root node when it overflows. */
    _splitRoot(arg1: unknown, arg2: unknown): unknown;

    /** Return all items stored in the index. */
    all(): unknown;

    /** Remove all items from the index. */
    clear(): unknown;

    /** Check whether any items in the index collide with the given bounding box. */
    collides(arg1: unknown): unknown;

    /** Compare two items by their minimum X coordinate for sorting. */
    compareMinX(arg1: unknown, arg2: unknown): unknown;

    /** Compare two items by their minimum Y coordinate for sorting. */
    compareMinY(arg1: unknown, arg2: unknown): unknown;

    /** Load the index state from a JSON representation. */
    fromJSON(arg1: unknown): unknown;

    /** Insert an item into the spatial index. */
    insert(arg1: unknown): unknown;

    /** Bulk-load a set of items into the index. */
    load(arg1: unknown): unknown;

    /** Remove an item from the index, optionally using a custom equality function. */
    remove(arg1: unknown, arg2: unknown): unknown;

    /** Search for all items that intersect the given bounding box. */
    search(arg1: unknown): unknown;

    /** Convert an item to its bounding box representation. */
    toBBox(arg1: unknown): unknown;

    /** Serialize the index state to a JSON representation. */
    toJSON(): unknown;
}
