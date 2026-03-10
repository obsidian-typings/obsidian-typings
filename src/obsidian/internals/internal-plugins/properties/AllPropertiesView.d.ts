import type { ItemView } from 'obsidian';

import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';

/**
 * View that displays all properties (frontmatter keys) across the vault.
 * @public
 * @unofficial
 */
export interface AllPropertiesView extends ItemView {
  /**
   * Try to rename the file.
   *
   * @returns A promise that resolves when the rename is complete.
   */
  acceptRename(): Promise<void>;

  /**
   * Cancels the rename.
   */
  cancelRename(): void;

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
   * Select the item in focus if pressed 'Enter'.
   *
   * @param event - The event triggered this function.
   */
  onKeyEnterInFocus(event: KeyboardEvent): void;

  /**
   * Called when 'Enter' is pressed while rename. Accepts the rename.
   *
   * @param event - The event triggered this function.
   */
  onKeyEnterInRename(event: KeyboardEvent): void;

  /**
   * Toggles the visibility of the search.
   */
  onToggleShowSearch(): void;

  /**
   * Set the visibility of the search filter.
   *
   * @param e - Whether to show the search filter.
   */
  setShowSearch(e: boolean): void;

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
   * @param e - The property item to rename.
   * @returns The result of the rename operation.
   */
  startRename(e: unknown): Promise<unknown>;

  /** Refresh the properties list. */
  update(): void;

  /**
   * Updates the search.
   */
  updateSearch(): void;
}
