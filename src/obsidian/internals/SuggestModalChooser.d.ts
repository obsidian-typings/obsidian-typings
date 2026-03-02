/**
 * Chooser component for a suggest modal, managing suggestion selection and navigation.
 *
 * @typeParam T - The type of the suggestion items.
 * @typeParam TModal - The type of the modal.
 * @public
 * @unofficial
 */
export interface SuggestModalChooser<T, TModal> {
    /** Reference to the owning modal. */
    chooser: TModal;

    /** Container element for the suggestion list. */
    containerEl: HTMLDivElement;

    /** Number of suggestions visible at once. */
    numVisibleItems: number;

    /** Height of each suggestion row in pixels. */
    rowHeight: number;

    /** Index of the currently selected suggestion. */
    selectedItem: number;

    /** DOM elements for each suggestion row. */
    suggestions: HTMLDivElement[];

    /** Current suggestion values, or null if none. */
    values: T[] | null;

    /**
     * Display a message in the suggestion list.
     *
     * @param text - Message text or document fragment to display.
     */
    addMessage(text: string | DocumentFragment): void;

    /**
     * Add a suggestion value to the list.
     *
     * @param value - Suggestion value to add.
     */
    addSuggestion(value: T): void;

    /**
     * Set the selected item by index, forcing scroll into view.
     *
     * @param index - Index of the item to select.
     * @param evt - The triggering event.
     */
    forceSetSelectedItem(index: number, evt: MouseEvent | KeyboardEvent): void;

    /**
     * Move selection to the next suggestion.
     *
     * @param evt - The keyboard event.
     * @returns False if already at the end, void otherwise.
     */
    moveDown(evt: KeyboardEvent): false | void;

    /**
     * Move selection to the previous suggestion.
     *
     * @param evt - The keyboard event.
     * @returns False if already at the start, void otherwise.
     */
    moveUp(evt: KeyboardEvent): false | void;

    /**
     * Handle click on a suggestion element.
     *
     * @param evt - The mouse event.
     * @param suggestion - The clicked suggestion element.
     */
    onSuggestionClick(evt: MouseEvent, suggestion: HTMLDivElement): void;

    /**
     * Handle mouseover on a suggestion element.
     *
     * @param evt - The mouse event.
     * @param suggestion - The hovered suggestion element.
     */
    onSuggestionMouseover(evt: MouseEvent, suggestion: HTMLDivElement): void;

    /**
     * Move selection down by one page of visible items.
     *
     * @param evt - The keyboard event.
     * @returns False if already at the end, void otherwise.
     */
    pageDown(evt: KeyboardEvent): false | void;

    /**
     * Move selection up by one page of visible items.
     *
     * @param evt - The keyboard event.
     * @returns False if already at the start, void otherwise.
     */
    pageUp(evt: KeyboardEvent): false | void;

    /**
     * Set the selected item by index.
     *
     * @param index - Index of the item to select.
     * @param evt - The triggering event.
     */
    setSelectedItem(index: number, evt: MouseEvent | KeyboardEvent): void;

    /**
     * Replace all suggestions with new values.
     *
     * @param values - Suggestion values to display, or null.
     */
    setSuggestions(values: T[] | null): void;

    /**
     * Accept the currently selected suggestion.
     *
     * @param evt - The triggering event.
     */
    useSelectedItem(evt: MouseEvent | KeyboardEvent): void;
}
