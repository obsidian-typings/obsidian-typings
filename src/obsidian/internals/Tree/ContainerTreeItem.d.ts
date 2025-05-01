import type { TreeItem } from './TreeItem.d.ts';
import type { TreeNode } from './TreeNode.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';

/**
 * @todo Documentation incomplete
 * 
 * @public
 * @unofficial
 */
export interface ContainerTreeItem<Parent extends TreeNode = TreeNode> extends TreeItem<Parent> {
    /**
     * @todo Documentation incomplete.
     */
    childrenEl: HTMLElement;
    /**
     * Current collapsed state of tree item.
     */
    collapsed: boolean;
    /**
     * @todo Documentation incomplete.
     */
    collapseEl: HTMLElement | null;
    /**
     * Whether tree item is able to be collapsed or not.
     */
    collapsible: boolean;
    /**
     * @todo Documentation incomplete.
     */
    pusherEl: HTMLElement;
    /**
     * @todo Documentation incomplete.
     */
    vChildren: TreeNodeVChildren<TreeItem<ContainerTreeItem>, ContainerTreeItem>;
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
     * @todo Documentation incomplete.
     */
    updateCollapsed(animate?: boolean): Promise<undefined>;
}