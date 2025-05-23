import type { TreeItem } from './TreeItem.d.ts';
import type { TreeNode } from './TreeNode.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface TreeRoot<Item extends TreeItem> extends TreeNode {
    /** @todo Documentation incomplete */
    childrenEl: HTMLElement;

    /** @todo Documentation incomplete */
    info: TreeNodeInfo;

    /** @todo Documentation incomplete */
    pusherEl: HTMLElement;

    /** @todo Documentation incomplete */
    vChildren: TreeNodeVChildren<Item, TreeRoot<Item>>;
}
