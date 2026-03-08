import type { TreeNode } from './TreeNode.d.ts';

/**
 * Manages the virtual children of a tree node for use with virtual scrolling.
 *
 * @typeParam Item - The type of the child items.
 * @typeParam Owner - The type of the owner node.
 * @public
 * @unofficial
 */
export interface TreeNodeVChildren<Item extends TreeNode, Owner extends TreeNode> {
    /** Internal array of child items. */
    _children: Item[];

    /** The tree node that owns these children. */
    owner: Owner;

    /**
     * Add a child item to this node.
     *
     * @param item - The child item to add.
     */
    addChild(item: Item): void;

    /**
     * Get the array of child items.
     *
     * @returns The child items.
     */
    get children(): Item[];

    /** Remove all children from this node. */
    clear(): void;

    /**
     * Get the first child item, or `undefined` if there are no children.
     *
     * @returns The first child item, or `undefined`.
     */
    first(): Item | undefined;

    /**
     * Check whether this node has any children.
     *
     * @returns Whether the node has children.
     */
    hasChildren(): boolean;

    /**
     * Get the last child item, or `undefined` if there are no children.
     *
     * @returns The last child item, or `undefined`.
     */
    last(): Item | undefined;

    /**
     * Remove a specific child item from this node.
     *
     * @param item - The child item to remove.
     */
    removeChild(item: Item): void;

    /**
     * Replace all children with the given array.
     *
     * @param children - The new array of child items.
     */
    setChildren(children: Item[]): void;

    /**
     * Get the number of children.
     *
     * @returns The number of child items.
     */
    size(): number;

    /**
     * Sort the children using the provided comparison function.
     *
     * @param compareFn - The comparison function for sorting.
     */
    sort(compareFn: (a: Item, b: Item) => number): void;
}
