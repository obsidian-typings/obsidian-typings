import type { TreeNode } from './TreeNode.d.ts';

/**
 * @public
 * @unofficial
 */
export interface TreeNodeVChildren<Item extends TreeNode, Owner extends TreeNode> {
    /** @todo Documentation incomplete. */
    _children: Item[];
    
    /** @todo Documentation incomplete. */
    owner: Owner;

    /** @todo Documentation incomplete. */
    get children(): Item[];

    /** @todo Documentation incomplete. */
    addChild(item: Item): void;

    /** @todo Documentation incomplete. */
    clear(): void;

    /** @todo Documentation incomplete. */
    first(): Item | undefined;

    /** @todo Documentation incomplete. */
    hasChildren(): boolean;

    /** @todo Documentation incomplete. */
    last(): Item | undefined;

    /** @todo Documentation incomplete. */
    removeChild(item: Item): void;

    /** @todo Documentation incomplete. */
    setChildren(children: Item[]): void;

    /** @todo Documentation incomplete. */
    size(): number;

    /** @todo Documentation incomplete. */
    sort(compareFn: (a: Item, b: Item) => number): void;
}
