import type { View } from 'obsidian';
import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';

/**
 * View that displays the global search results pane.
 * @public
 * @unofficial
 */
export interface SearchView extends View {
    /**
     * Returns the value of the search element.
     *
     * @returns The current search query string.
     */
    getQuery(): string;

    /**
     * Get the current view type.
     *
     * @returns The search view type.
     */
    getViewType(): typeof ViewType.Search;

    /**
     * Handle the copy search results button click.
     *
     * @param event - The mouse click event.
     */
    onCopyResultsClick(event: MouseEvent): void;

    /**
     * Handle the down arrow key when a search result is focused.
     *
     * @param event - The keyboard event.
     */
    onKeyArrowDownInFocus(event: KeyboardEvent): void;

    /**
     * Handle the left arrow key when a search result is focused.
     *
     * @param event - The keyboard event.
     */
    onKeyArrowLeftInFocus(event: KeyboardEvent): void;

    /**
     * Handle the right arrow key when a search result is focused.
     *
     * @param event - The keyboard event.
     */
    onKeyArrowRightInFocus(event: KeyboardEvent): void;

    /**
     * Handle the up arrow key when a search result is focused.
     *
     * @param event - The keyboard event.
     */
    onKeyArrowUpInFocus(event: KeyboardEvent): void;

    /**
     * Handle the enter key when a search result is focused.
     *
     * @param event - The keyboard event.
     */
    onKeyEnterInFocus(event: KeyboardEvent): void;

    /**
     * Show more context lines after a match.
     *
     * @param e - The keyboard event.
     */
    onKeyShowMoreAfter(e: unknown): void;

    /**
     * Show more context lines before a match.
     *
     * @param e - The keyboard event.
     */
    onKeyShowMoreBefore(e: unknown): void;

    /**
     * Called when the tap header is clicked. Brings this tab to the front.
     */
    onTabHeaderClick(): void;

    /**
     * Render search metadata information into the given parent element.
     *
     * @param e - The search metadata to render.
     * @param parentEl - The parent element to render into.
     */
    renderSearchInfo(e: unknown, parentEl: HTMLElement): void;

    /**
     * Saves the current search string to the recent searches in Local Storage.
     */
    saveSearch(): void;

    /**
     * Set whether all search results are collapsed.
     *
     * @param e - Whether to collapse all results.
     */
    setCollapseAll(e: unknown): void;

    /**
     * Toggle the search query explanation display.
     *
     * @param e - Whether to show the query explanation.
     */
    setExplainSearch(e: unknown): void;

    /**
     * Set whether extra context lines are shown around matches.
     *
     * @param e - Whether to show extra context.
     */
    setExtraContext(e: unknown): void;

    /**
     * Set whether the search is case-sensitive.
     *
     * @param e - Whether to match case.
     */
    setMatchingCase(e: unknown): void;

    /**
     * Sets the value of the search element.
     *
     * @param value - The search string.
     */
    setQuery(value: string): void;

    /**
     * Set the sort order for search results.
     *
     * @param sortOrder - The sort order to apply.
     */
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
