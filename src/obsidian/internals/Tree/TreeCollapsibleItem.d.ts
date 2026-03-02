import type { TreeItem } from './TreeItem.d.ts';

/**
 * A tree item that can be collapsed to hide its children.
 * @public
 * @unofficial
 */
export interface TreeCollapsibleItem extends TreeItem {
    /** Container element for the child items of this collapsible node. */
    childrenEl: HTMLElement;

    /**
     * Current collapsed state of tree item.
     */
    collapsed: boolean;

    /** Element for the collapse/expand toggle indicator, or null if not rendered. */
    collapseEl: HTMLElement | null;

    /**
     * Whether tree item is able to be collapsed or not.
     */
    collapsible: boolean;

    /**
     * Execute collapse functionality on mouse click.
     */
    onCollapseClick(event: MouseEvent): void;

    /**
     * Set collapsed state of tree item.
     *
     * @param animate - If set to true, will animate on collapse.
     */
    setCollapsed(value: boolean, animate?: boolean): Promise<undefined>;

    /**
     * Set collapsible state of tree item.
     */
    setCollapsible(value: boolean): void;

    /**
     * Toggle collapsed state of tree item.
     *
     * @param animate - If set to true, will animate on collapse.
     */
    toggleCollapsed(animate?: boolean): Promise<undefined>;

    /**
     * Update the tree item's cover element.
     *
     * @param animate - If set to true, will animate on collapse.
     */
    updateCollapsed(animate?: boolean): Promise<undefined>;
}
