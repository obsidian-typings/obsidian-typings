import type { InfoFileView } from "../types.js";
/** @todo Documentation incomplete */
export interface OutlineView extends InfoFileView {
    findCorrespondingLeaf(): unknown;
    handleCollapseAll(e: unknown): void;
    /**
     * Get the current view type
     */
    getViewType(): "outline";
    /** @internal */
    findActiveHeading(e: unknown): unknown | undefined;
    /** @internal */
    setHighlightedItem(e: unknown): void;
    /** @internal */
    getOwner(): unknown;
    /** @internal */
    onMarkdownScroll(e: unknown): void;
    /** @internal */
    onFileChanged(e: unknown): void;
    /** @internal */
    handleSelectionChange(): void;
    /** @internal */
    createItemDom(e: unknown): unknown;
    /** @internal */
    update(): void;
    /** @internal */
    filterSearchResults(): void;
    /** @internal */
    getHeadings(): unknown;
    /** @internal */
    onToggleShowSearch(): void;
    /** @internal */
    showSearch(): void;
    /** @internal */
    setShowSearch(e: unknown): void;
    /** @internal */
    updateSearch(): void;
}
