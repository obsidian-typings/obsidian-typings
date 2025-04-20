import type { View } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';

/** @todo Documentation incomplete */
/**
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

    /** @todo Documentation incomplete */
    onCopyResultsClick(event: MouseEvent): void;

    /** @todo Documentation incomplete */
    onKeyArrowDownInFocus(event: KeyboardEvent): void;

    /** @todo Documentation incomplete */
    onKeyArrowLeftInFocus(event: KeyboardEvent): void;

    /** @todo Documentation incomplete */
    onKeyArrowRightInFocus(event: KeyboardEvent): void;

    /** @todo Documentation incomplete */
    onKeyArrowUpInFocus(event: KeyboardEvent): void;

    /** @todo Documentation incomplete */
    onKeyEnterInFocus(event: KeyboardEvent): void;

    /** @todo Documentation incomplete */
    onKeyShowMoreAfter(e: unknown): void;

    /** @todo Documentation incomplete */
    onKeyShowMoreBefore(e: unknown): void;

    /**
     * Called when the tap header is clicked. Brings this tab to the front.
     */
    onTabHeaderClick(): void;

    /** @todo Documentation incomplete */
    renderSearchInfo(e: unknown, parentEl: HTMLElement): void;

    /**
     * Saves the current search string to the recent searches in Local Storage.
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
     * Sets the value of the search element.
     * @param value - The search string.
     */
    setQuery(value: string): void;

    /** @todo Documentation incomplete */
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
