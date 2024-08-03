import type { ItemView } from "obsidian";
/** @todo Documentation incomplete */
export interface AllPropertiesView extends ItemView {
    /** @todo Documentation incomplete */
    startRename(e: unknown): Promise<unknown>;
    /** @internal */
    onKeyEnterInRename(e: unknown): void;
    /** @internal */
    exitRename(): void;
    /** @internal */
    cancelRename(): void;
    /** @internal */
    acceptRename(e: unknown): unknown;
    /** @internal */
    onToggleShowSearch(): void;
    /** @internal */
    showSearch(): void;
    /** @internal */
    setShowSearch(e: unknown): void;
    /** @internal */
    updateSearch(): void;
    /** @internal */
    isItem(e: unknown): boolean;
    /** @internal */
    onKeyEnterInFocus(e: unknown): void;
    /**
     * Get the current view type
     */
    getViewType(): "all-properties";
    /** @internal */
    setSortOrder(e: unknown): void;
    /** @internal */
    update(): void;
}
