import type { View } from "obsidian";
/** @todo Documentation incomplete */
export interface SearchView extends View {
    /** @internal */
    onCopyResultsClick(e: unknown): void;
    /** @internal */
    onKeyArrowDownInFocus(e: unknown): void;
    /** @internal */
    onKeyArrowLeftInFocus(e: unknown): void;
    /** @internal */
    onKeyArrowUpInFocus(e: unknown): void;
    /** @internal */
    onKeyEnterInFocus(e: unknown): void;
    /** @internal */
    saveSearch(): void;
    /** @internal */
    setCollapseAll(e: unknown): void;
    /** @internal */
    setExplainSearch(e: unknown): void;
    /** @internal */
    setExtraContext(e: unknown): void;
    /** @internal */
    setMatchingCase(e: unknown): void;
    /** @internal */
    toggleFilterSection(): void;
    /**
     * Get the current view type
     * @returns "search"
     */
    getViewType(): string;
    /** @internal */
    onKeyArrowRightInFocus(e: unknown): void;
    /** @internal */
    onKeyShowMoreBefore(e: unknown): void;
    /** @internal */
    onKeyShowMoreAfter(e: unknown): void;
    /** @internal */
    setSortOrder(e: unknown): void;
    /** @internal */
    startSearch(): void;
    /** @internal */
    stopSearch(): void;
    /** @internal */
    renderSearchInfo(e: unknown, t: unknown): void;
    /** @internal */
    setQuery(e: unknown): void;
    /** @internal */
    getQuery(): unknown;
    /** @internal */
    onTabHeaderClick(): void;
}
