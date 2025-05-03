import type { ItemView } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface AllPropertiesView extends ItemView {
    /**
     * Try to rename the file.
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
     */
    getViewType(): typeof ViewType.AllProperties;

    /** @todo Documentation incomplete */
    isItem(e: unknown): boolean;

    /**
     * Select the item in focus if pressed 'Enter'.
     * @param event - The event triggered this function.
     */
    onKeyEnterInFocus(event: KeyboardEvent): void;

    /**
     * Called when 'Enter' is pressed while rename. Accepts the rename.
     * @param event - The event triggered this function.
     */
    onKeyEnterInRename(event: KeyboardEvent): void;

    /**
     * Toggles the visibility of the search.
     */
    onToggleShowSearch(): void;

    /** @todo Documentation incomplete */
    setShowSearch(e: boolean): void;

    /**
     * Updates the sort order and sort by it.
     * @param order - The sort order.
     */
    setSortOrder(order: unknown): void;

    /**
     * Shows the search and focus is.
     */
    showSearch(): void;

    /** @todo Documentation incomplete */
    startRename(e: unknown): Promise<unknown>;

    /** @todo Documentation incomplete */
    update(): void;

    /**
     * Updates the search.
     */
    updateSearch(): void;
}
