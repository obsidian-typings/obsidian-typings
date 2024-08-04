import type { ItemView } from "obsidian";

/** @todo Documentation incomplete */
export interface AllPropertiesView extends ItemView {
    /** @todo Documentation incomplete */
    startRename(e: unknown): Promise<unknown>;
    /**
     * Called when 'Enter' is pressed while rename. Accepts the rename
     * @param event The event triggered this function
     */
    onKeyEnterInRename(event: KeyboardEvent): void;
    /**
     * Quits the rename
     */
    exitRename(): void;
    /**
     * Cancels the rename
     */
    cancelRename(): void;
    /**
     * Try to rename the file
     */
    acceptRename(): Promise<void>;
    /**
     * Toggles the visibility of the search
     */
    onToggleShowSearch(): void;
    /**
     * Shows the search and focus is
     */
    showSearch(): void;
    /** @todo Documentation incomplete */
    setShowSearch(e: boolean): void;
    /**
     * Updates the search
     */
    updateSearch(): void;
    /** @todo Documentation incomplete */
    isItem(e: unknown): boolean;
    /**
     * Select the item in focus if pressed 'Enter'
     * @param event The event triggered this function
     */
    onKeyEnterInFocus(event: KeyboardEvent): void;
    /**
     * Get the current view type
     */
    getViewType(): "all-properties";
    /**
     * Updates the sort order and sort by it
     * @param order The sort order
     */
    setSortOrder(order: unknown): void;
    /** @todo Documentation incomplete */
    update(): void;
}
