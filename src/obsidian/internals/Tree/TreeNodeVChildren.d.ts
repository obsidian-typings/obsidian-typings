/**
 * @public
 * @unofficial
 */
export interface TreeNodeVChildren<Item, Owner> {
    _children: Item[];
    children?: Item[];
    owner: Owner;

    addChild(item: Item): void;
    clear(): void;
    first(): Item | undefined;
    hasChildren(): boolean;
    last(): Item | undefined;
    removeChild(item: Item): void;
    setChildren(children: Item[]): void;
    size(): number;
    sort(compareFn: (a: Item, b: Item) => number): void;
}
