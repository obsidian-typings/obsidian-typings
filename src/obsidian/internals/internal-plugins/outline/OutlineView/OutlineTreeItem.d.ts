import type { HeadingCache } from 'obsidian';

import type { Tree } from '../../../tree/Tree.d.ts';
import type { TreeCollapsibleItem } from '../../../tree/TreeCollapsibleItem.d.ts';
import type { TreeNodeVChildren } from '../../../tree/TreeNodeVChildren.d.ts';
import type { OutlineView } from './OutlineView.d.ts';

/**
 * A heading row in the outline sidebar.
 *
 * @public
 * @unofficial
 */
export interface OutlineTreeItem extends TreeCollapsibleItem {
  /** Cached heading represented by this row. */
  heading: HeadingCache;

  /** Rendered plain heading text. */
  headingText: string;

  /** Heading path through its ancestors. */
  readonly path: string;

  /** Virtual scrolling spacer. */
  pusherEl: HTMLElement;

  /** Owning tree. */
  tree: Tree<OutlineTreeItem>;

  /** Nested heading rows. */
  vChildren: TreeNodeVChildren<OutlineTreeItem, OutlineTreeItem>;

  /** Owning outline view. */
  view: OutlineView;
}
