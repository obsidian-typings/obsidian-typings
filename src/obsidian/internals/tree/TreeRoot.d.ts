import type { TreeItem } from './TreeItem.d.ts';
import type { TreeNode } from './TreeNode.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';

/**
 * Root node of a tree view that contains all top-level tree items.
 *
 * @typeParam Item - The type of the tree items.
 * @public
 * @unofficial
 */
export interface TreeRoot<Item extends TreeItem> extends TreeNode {
  /** Container element for the root's child items. */
  childrenEl: HTMLElement;

  /** Layout information for the root node used by virtual scrolling. */
  info: TreeNodeInfo;

  /** Spacer element used to maintain correct scroll height for virtual scrolling. */
  pusherEl: HTMLElement;

  /** Virtual children manager for the root's child items. */
  vChildren: TreeNodeVChildren<Item, TreeRoot<Item>>;
}
