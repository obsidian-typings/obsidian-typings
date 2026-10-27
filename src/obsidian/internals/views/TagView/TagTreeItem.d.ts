import type { Tree } from '../../tree/Tree.d.ts';
import type { TreeCollapsibleItem } from '../../tree/TreeCollapsibleItem.d.ts';
import type { TreeNodeVChildren } from '../../tree/TreeNodeVChildren.d.ts';
import type { TagView } from './TagView.d.ts';

/**
 * A tag row in the tag sidebar.
 *
 * @public
 * @unofficial
 */
export interface TagTreeItem extends TreeCollapsibleItem {
  /** Number of occurrences. */
  count: number;

  /** Virtual scrolling spacer. */
  pusherEl: HTMLElement;

  /** Full tag including its leading hash. */
  tag: string;

  /** Occurrence count element. */
  tagCountEl: HTMLSpanElement;

  /** Tag label element. */
  tagTextEl: HTMLDivElement;

  /** Owning tag view. */
  tagView: TagView;

  /** Owning tree. */
  tree: Tree<TagTreeItem>;

  /** Nested tag rows. */
  vChildren: TreeNodeVChildren<TagTreeItem, TagTreeItem>;

  /**
   * Update the occurrence count.
   *
   * @param count - The new count.
   * @returns This row.
   */
  setCount(count: number): this;

  /**
   * Update the tag label.
   *
   * @param tag - The full tag.
   * @returns This row.
   */
  setTag(tag: string): this;
}
