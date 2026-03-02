import type { View } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';

/**
 * View that displays the global search results pane.
 * @public
 * @unofficial
 */
export interface SearchView extends View {
    /**
     * Returns the value of the search element.
     */
    getQuery(): string;

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.Search;

    /** Handle the copy search results button click. */
    onCopyResultsClick(event: MouseEvent): void;

    /** Handle the down arrow key when a search result is focused. */
    onKeyArrowDownInFocus(event: KeyboardEvent): void;

    /** Handle the left arrow key when a search result is focused. */
    onKeyArrowLeftInFocus(event: KeyboardEvent): void;

    /** Handle the right arrow key when a search result is focused. */
    onKeyArrowRightInFocus(event: KeyboardEvent): void;

    /** Handle the up arrow key when a search result is focused. */
    onKeyArrowUpInFocus(event: KeyboardEvent): void;

    /** Handle the enter key when a search result is focused. */
    onKeyEnterInFocus(event: KeyboardEvent): void;

    /** Show more context lines after a match. */
    onKeyShowMoreAfter(e: unknown): void;

    /** Show more context lines before a match. */
    onKeyShowMoreBefore(e: unknown): void;

    /**
     * Called when the tap header is clicked. Brings this tab to the front.
     */
    onTabHeaderClick(): void;

    /** Render search metadata information into the given parent element. */
    renderSearchInfo(e: unknown, parentEl: HTMLElement): void;

    /**
     * Saves the current search string to the recent searches in Local Storage.
     */
    saveSearch(): void;

    /** Set whether all search results are collapsed. */
    setCollapseAll(e: unknown): void;

    /** Toggle the search query explanation display. */
    setExplainSearch(e: unknown): void;

    /** Set whether extra context lines are shown around matches. */
    setExtraContext(e: unknown): void;

    /** Set whether the search is case-sensitive. */
    setMatchingCase(e: unknown): void;

    /**
     * Sets the value of the search element.
     *
     * @param value - The search string.
     */
    setQuery(value: string): void;

    /** Set the sort order for search results. */
    setSortOrder(sortOrder: unknown): void;

    /**
     * Starts the search and renders the results.
     */
    startSearch(): void;

    /**
     * Stops the search and clears the results.
     */
    stopSearch(): void;

    /**
     * Toggles the visibility of the filter section. Called if clicked on 'Search settings'.
     */
    toggleFilterSection(): void;
}
