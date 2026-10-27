import type {
  Debouncer,
  SearchComponent,
  View
} from 'obsidian';

import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { ObsidianSearchQuery } from '../../search-query/ObsidianSearchQuery.d.ts';
import type { Tree } from '../../tree/Tree.d.ts';
import type { TagTreeItem } from './TagTreeItem.d.ts';

/**
 * View for browsing and navigating tags in the vault.
 *
 * @public
 * @unofficial
 */
export interface TagView extends View {
  /** Button that collapses or expands tag groups. */
  collapseOrExpandAllEl: HTMLDivElement;

  /** Message displayed when the vault has no tags. */
  emptyEl: HTMLDivElement;

  /** Whether the search input is shown. */
  isShowingSearch: boolean;

  /** Debounced tag refresh. */
  requestUpdateTags: Debouncer<[], void>;

  /** Tag search input component. */
  searchComponent: SearchComponent;

  /** Compiled tag filter, or `null`. */
  searchQuery: null | ObsidianSearchQuery;

  /** Button that toggles search visibility. */
  showSearchButtonEl: HTMLDivElement;

  /** Current ordering of tags. */
  sortOrder: 'alphabetical' | 'alphabeticalReverse' | 'frequency' | 'frequencyReverse';

  /** Rows indexed by lower-case tag. */
  tagDoms: Record<string, TagTreeItem>;

  /** Container for the tag tree. */
  tagPaneEl: HTMLDivElement;

  /** Tree of tag rows. */
  tree: Tree<TagTreeItem>;

  /** Whether nested tags are displayed hierarchically. */
  useHierarchy: boolean;

  /** Button that toggles nested tags. */
  useHierarchyEl: HTMLDivElement;

  /**
   * Get the identifier of a tag tree node.
   *
   * @param item - The tag tree node.
   * @returns The node identifier.
   */
  getNodeId(item: TagTreeItem): string;

  /**
   * Get the current view type.
   *
   * @returns The view type identifier.
   */
  getViewType(): typeof ViewType.Tag;

  /**
   * Check whether the given item is a valid tag view item.
   *
   * @param item - The item to check.
   * @returns Whether the item is a valid tag view item.
   */
  isItem(item: unknown): boolean;

  /**
   * Handle pressing Enter on the currently focused tag item.
   *
   * @param $event - The keyboard event.
   */
  onKeyEnterInFocus($event: KeyboardEvent): void;

  /**
   * Toggle search visibility and focus the input.
   */
  onToggleShowSearch(): void;

  /**
   * Set whether all tag groups are collapsed.
   *
   * @param e - Whether all groups should be collapsed.
   */
  setIsAllCollapsed(e: unknown): void;

  /**
   * Set search visibility, clearing the query when hidden.
   *
   * @param value - Whether to show the search input.
   */
  setShowSearch(value: boolean): void;

  /**
   * Set whether tags should be displayed in a nested hierarchy.
   *
   * @param e - Whether to use hierarchy.
   */
  setUseHierarchy(e: unknown): void;

  /**
   * Show and focus the search input.
   */
  showSearch(): void;

  /**
   * Compile the input and update the tag filter.
   */
  updateSearch(): void;

  /**
   * Reloads all tags from vault, update all items and sort those.
   */
  updateTags(): void;
}
