import type {
    EditorSuggest,
    SearchResult
} from 'obsidian';

/**
 * Container for displaying and navigating editor suggestion items.
 *
 * @typeParam T - The type of the suggestion items.
 * @public
 * @unofficial
 */
export interface SuggestionContainer<T> {
    /**
     * Which suggestions should be picked from.
     */
    chooser: EditorSuggest<T>;

    /**
     * Pop-up element that displays the suggestions.
     */
    containerEl: HTMLElement;

    /**
     * The currently focused item.
     */
    selectedItem: number;

    /**
     * List of all possible suggestions as elements.
     */
    suggestions: HTMLElement[];

    /**
     * List of all possible suggestions as data.
     */
    values: SearchResult[];

    /**
     * Add an empty message with provided text.
     *
     * @param text - Message text to display.
     * @returns The created message element.
     */
    addMessage(text: string): HTMLElement;

    /**
     * Add suggestion to container.
     *
     * @param suggestion - Suggestion to add.
     */
    addSuggestion(suggestion: SearchResult): void;

    /**
     * Set selected item to one specified by index, if keyboard navigation, force scroll into view.
     *
     * @param index - Index of the item to select.
     * @param event - The triggering event.
     * @remark Prefer setSelectedItem, which clamps the index to within suggestions array.
     */
    forceSetSelectedItem(index: number, event: Event): void;

    /**
     * Get the DOM element of the currently selected suggestion.
     *
     * @returns The selected element, or `null`.
     */
    getSelectedElement(): HTMLElement | null;

    /**
     * Get the data value of the currently selected suggestion.
     *
     * @returns The selected suggestion data, or `null`.
     */
    getSelectedValue(): SearchResult | null;

    /**
     * Move selected item to next suggestion.
     *
     * @param event - The keyboard event.
     * @returns Whether the move was handled.
     */
    moveDown(event: KeyboardEvent): boolean;

    /**
     * Move selected item to previous suggestion.
     *
     * @param event - The keyboard event.
     * @returns Whether the move was handled.
     */
    moveUp(event: KeyboardEvent): boolean;

    /**
     * Amount of suggestions that can be displayed at once within containerEl.
     *
     * @returns The number of visible items.
     */
    get numVisibleItems(): number;

    /**
     * Process click on suggestion item.
     *
     * @param event - The mouse event.
     * @param element - The clicked suggestion element.
     */
    onSuggestionClick(event: MouseEvent, element: HTMLElement): void;

    /**
     * Process hover on suggestion item.
     *
     * @param event - The mouse event.
     * @param element - The hovered suggestion element.
     * @returns The result of handling the mouseover.
     */
    onSuggestionMouseover(event: MouseEvent, element: HTMLElement): unknown;

    /**
     * Move selected item to the one in the next 'page' (next visible block).
     *
     * @param event - The keyboard event.
     * @returns Whether the page-down was handled.
     */
    pageDown(event: KeyboardEvent): boolean;

    /**
     * Move selected item to the one in the previous 'page' (previous visible block).
     *
     * @param event - The keyboard event.
     * @returns Whether the page-up was handled.
     */
    pageUp(event: KeyboardEvent): boolean;

    /**
     * Height in pixels of the selected item.
     *
     * @returns The row height in pixels.
     */
    get rowHeight(): number;

    /**
     * Set selected item to one specified by index, invokes forceSetSelectedItem.
     *
     * @param index - Index of the item to select.
     * @param event - The triggering event.
     */
    setSelectedItem(index: number, event: Event): void;

    /**
     * Empties original container and adds multiple suggestions.
     *
     * @param suggestions - Suggestions to display.
     */
    setSuggestions(suggestions: SearchResult[]): void;

    /**
     * Use currently selected suggestion as the accepted one.
     *
     * @param event - The triggering event.
     * @returns Whether a suggestion was accepted.
     */
    useSelectedItem(event: Event): boolean;
}
