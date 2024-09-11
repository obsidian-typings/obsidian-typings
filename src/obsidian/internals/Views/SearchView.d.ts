import type { View } from 'obsidian';

/** @todo Documentation incomplete */
/** @public */
export interface SearchView extends View {
    /** @todo Documentation incomplete */
    onCopyResultsClick(event: MouseEvent): void;
    /** @todo Documentation incomplete */
    onKeyArrowDownInFocus(event: KeyboardEvent): void;
    /** @todo Documentation incomplete */
    onKeyArrowLeftInFocus(event: KeyboardEvent): void;
    /** @todo Documentation incomplete */
    onKeyArrowUpInFocus(event: KeyboardEvent): void;
    /** @todo Documentation incomplete */
    onKeyEnterInFocus(event: KeyboardEvent): void;
    /**
     * Saves the current search string to the recent searches in Local Storage
     */
    saveSearch(): void;
    /** @todo Documentation incomplete */
    setCollapseAll(e: unknown): void;
    /** @todo Documentation incomplete */
    setExplainSearch(e: unknown): void;
    /** @todo Documentation incomplete */
    setExtraContext(e: unknown): void;
    /** @todo Documentation incomplete */
    setMatchingCase(e: unknown): void;
    /**
     * Toggles the visibility of the filter section. Called if clicked on 'Search settings'
     */
    toggleFilterSection(): void;
    /**
     * Get the current view type
     */
    getViewType(): 'search';
    /** @todo Documentation incomplete */
    onKeyArrowRightInFocus(event: KeyboardEvent): void;
    /** @todo Documentation incomplete */
    onKeyShowMoreBefore(e: unknown): void;
    /** @todo Documentation incomplete */
    onKeyShowMoreAfter(e: unknown): void;
    /** @todo Documentation incomplete */
    setSortOrder(sortOrder: unknown): void;
    /**
     * Starts the search and renders the results
     */
    startSearch(): void;
    /**
     * Stops the search and clears the results
     */
    stopSearch(): void;
    /** @todo Documentation incomplete */
    renderSearchInfo(e: unknown, parentEl: HTMLElement): void;
    /**
     * Sets the value of the search element
     * @param value - The search string
     */
    setQuery(value: string): void;
    /**
     * Returns the value of the search element
     */
    getQuery(): string;
    /**
     * Called when the tap header is clicked. Brings this tab to the front
     */
    onTabHeaderClick(): void;
}
