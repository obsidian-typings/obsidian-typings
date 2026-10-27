import type {
  Debouncer,
  ItemView,
  Scope
} from 'obsidian';

import type { ViewType } from '../../../../implementations/constants/ViewType.d.ts';
import type { NavigationSearch } from '../../../components/NavigationSearch.d.ts';
import type { ObsidianSearchQuery } from '../../../search-query/ObsidianSearchQuery.d.ts';
import type { Tree } from '../../../tree/Tree.d.ts';
import type { TreeRoot } from '../../../tree/TreeRoot.d.ts';
import type { PropertyTreeItem } from './PropertyTreeItem.d.ts';

/**
 * {@link obsidian#View} that displays all properties (frontmatter keys) across the vault.
 *
 * @public
 * @unofficial
 */
export interface AllPropertiesView extends ItemView {
  /** Property rows indexed by lower-case property name. */
  doms: Record<string, PropertyTreeItem>;

  /** Message displayed when the vault has no properties. */
  emptyStateEl: HTMLDivElement;

  /** The property row being renamed, or `null`. */
  propertyBeingRenamed: null | PropertyTreeItem;

  /** Keyboard scope used during inline renaming. */
  propertyRenameScope: Scope;

  /** Debounced property refresh. */
  requestUpdate: Debouncer<[], void>;

  /** Root of the property tree. */
  readonly root: TreeRoot<PropertyTreeItem>;

  /** Search visibility and input controls. */
  search: NavigationSearch;

  /** Compiled property filter, or `null`. */
  searchQuery: null | ObsidianSearchQuery;

  /** Current ordering of properties. */
  sortOrder: 'alphabetical' | 'alphabeticalReverse' | 'frequency' | 'frequencyReverse';

  /** Tree of property rows. */
  tree: Tree<PropertyTreeItem>;

  /**
   * Save the current property rename.
   *
   * @param item - The row being renamed, or `null` when no rename is active.
   * @returns A promise that resolves when the rename is complete.
   */
  acceptRename(item: null | PropertyTreeItem): Promise<void>;

  /**
   * Cancels the rename.
   */
  cancelRename(): void;

  /**
   * Delete a property from the vault and clear the pending visual state.
   *
   * @param item - The property row to delete.
   * @returns Resolves when deletion finishes.
   */
  deleteProperty(item: PropertyTreeItem): Promise<void>;

  /**
   * Quits the rename.
   */
  exitRename(): void;

  /**
   * Get the current view type.
   *
   * @returns The all properties view type.
   */
  getViewType(): typeof ViewType.AllProperties;

  /**
   * Check whether the given object is a property item.
   *
   * @param e - The object to check.
   * @returns Whether the object is a property item.
   */
  isItem(e: unknown): boolean;

  /**
   * Delete the selected property rows.
   *
   * @param $event - The deletion keyboard event.
   */
  onDeleteSelectedItems($event: KeyboardEvent): void;

  /**
   * Select the item in focus if pressed 'Enter'.
   *
   * @param $event - The event triggered this function.
   */
  onKeyEnterInFocus($event: KeyboardEvent): void;

  /**
   * Called when 'Enter' is pressed while rename. Accepts the rename.
   *
   * @param $event - The event triggered this function.
   */
  onKeyEnterInRename($event: KeyboardEvent): void;

  /**
   * Compile the input and refresh the property list.
   */
  onSearchChanged(): void;

  /**
   * Updates the sort order and sort by it.
   *
   * @param order - The sort order.
   */
  setSortOrder(order: unknown): void;

  /**
   * Shows the search and focus is.
   */
  showSearch(): void;

  /**
   * Begin inline renaming of a property.
   *
   * @param item - The property item to rename.
   */
  startRename(item: PropertyTreeItem): void;

  /**
   * Refresh the properties list.
   */
  update(): void;
}
