export default TreeItem;

/** @todo Documentation incomplete */
type TreeItem<T> = TreeNode<T> & {
    collapseEl: HTMLElement;
    /**
     * @deprecated Potentially removed in 1.6.0 for some tree-likes
     */
    collapsed: boolean;
    /**
     * @deprecated Potentially removed in 1.6.0 for some tree-likes
     */
    collapsible: boolean;
    coverEl: HTMLElement;
    innerEl: HTMLElement;
    parent: TreeNode<T> | undefined;
    selfEl: HTMLElement;
    view: View;

    /**
     * Execute collapse functionality on mouse click
     */
    onCollapseClick(event: MouseEvent): void;
    /**
     * Execute item functionality on clicking tree item
     */
    onSelfClick(event: MouseEvent): void;
    /**
     * Set clickable state of tree item
     */
    setClickable(clickable: boolean): void;
    /**
     * Set collapsed state of tree item
     */
    setCollapsed(collapsed: boolean, check: boolean): Promise<undefined>;
    /**
     * Set collapsible state of tree item
     */
    setCollapsible(collapsible: boolean): void;
    /**
     * Toggle collapsed state of tree item
     */
    toggleCollapsed(check: boolean): Promise<undefined>;
    /**
     * @internal Update the tree item's cover element
     */
    updateCollapsed(check: boolean): Promise<undefined>;
};
