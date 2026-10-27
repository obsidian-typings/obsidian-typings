import type { CachedMetadata } from 'obsidian';

import type { ResultDomItem } from './ResultDomItem.d.ts';
import type { ResultProperty } from './ResultProperty.d.ts';
import type { TreeNode } from './TreeNode.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';

/**
 * The search result row that shows one matched frontmatter property as `key: value`.
 *
 * A {@link ResultDomItem} builds one per matched property key, beside its {@link ResultDomItemChild} content rows.
 *
 * @public
 * @unofficial
 */
export interface ResultDomItemPropertyChild extends TreeNode {
  /**
   * Cached metadata of the file, whose `frontmatter` the row reads the value from. An empty object when the
   * file has no cache.
   */
  cache: Partial<CachedMetadata>;

  /**
   * Root element of the row.
   */
  el: HTMLDivElement;

  /**
   * Layout information used by virtual scrolling.
   */
  info: TreeNodeInfo;

  /**
   * The matches of this row's property, all with the same {@link ResultProperty.key}.
   */
  matches: ResultProperty[];

  /**
   * Callback for custom rendering of match highlights.
   */
  onMatchRender: unknown;

  /**
   * The result item this row belongs to.
   */
  parentDom: ResultDomItem;

  /**
   * Constructor.
   *
   * @param parentDom - The result item this row belongs to.
   * @param cache - Cached metadata of the file.
   * @param matches - The matches of this row's property.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__?(parentDom: ResultDomItem, cache: Partial<CachedMetadata>, matches: ResultProperty[]): this;

  /**
   * Handle focus entering this row.
   *
   * @param $event - The UI event that triggered focus.
   */
  onFocusEnter($event?: UIEvent): void;

  /**
   * Handle focus leaving this row.
   *
   * @param $event - The UI event that triggered focus exit.
   */
  onFocusExit($event?: UIEvent): void;

  /**
   * Handle click on this row: opens the file with the property matches highlighted.
   *
   * @param $event - The UI event that triggered the click.
   */
  onResultClick($event: UIEvent): void;

  /**
   * Render the row as `key: value`, reading the value as `cache.frontmatter[matches[0].key]` and highlighting
   * the matched ranges.
   */
  render(): void;
}
