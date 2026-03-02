import type { TreeNode } from './TreeNode.d.ts';

/**
 * Manages the virtual children of a tree node for use with virtual scrolling.
 * @public
 * @unofficial
 */
export interface TreeNodeVChildren<Item extends TreeNode, Owner extends TreeNode> {
    /** Internal array of child items. */
    _children: Item[];

    /** The tree node that owns these children. */
    owner: Owner;

    /** Get the array of child items. */
    get children(): Item[];

    /** Add a child item to this node. */
    addChild(item: Item): void;

    /** Remove all children from this node. */
    clear(): void;

    /** Get the first child item, or undefined if there are no children. */
    first(): Item | undefined;

    /** Check whether this node has any children. */
    hasChildren(): boolean;

    /** Get the last child item, or undefined if there are no children. */
    last(): Item | undefined;

    /** Remove a specific child item from this node. */
    removeChild(item: Item): void;

    /** Replace all children with the given array. */
    setChildren(children: Item[]): void;

    /** Get the number of children. */
    size(): number;

    /** Sort the children using the provided comparison function. */
    sort(compareFn: (a: Item, b: Item) => number): void;
}
