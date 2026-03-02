/**
 * Chooser component for a suggest modal, managing suggestion selection and navigation.
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

    /** Display a message in the suggestion list. */
    addMessage(text: string | DocumentFragment): void;

    /** Add a suggestion value to the list. */
    addSuggestion(value: T): void;

    /** Set the selected item by index, forcing scroll into view. */
    forceSetSelectedItem(index: number, evt: MouseEvent | KeyboardEvent): void;

    /** Move selection to the next suggestion. */
    moveDown(evt: KeyboardEvent): false | void;

    /** Move selection to the previous suggestion. */
    moveUp(evt: KeyboardEvent): false | void;

    /** Handle click on a suggestion element. */
    onSuggestionClick(evt: MouseEvent, suggestion: HTMLDivElement): void;

    /** Handle mouseover on a suggestion element. */
    onSuggestionMouseover(evt: MouseEvent, suggestion: HTMLDivElement): void;

    /** Move selection down by one page of visible items. */
    pageDown(evt: KeyboardEvent): false | void;

    /** Move selection up by one page of visible items. */
    pageUp(evt: KeyboardEvent): false | void;

    /** Set the selected item by index. */
    setSelectedItem(index: number, evt: MouseEvent | KeyboardEvent): void;

    /** Replace all suggestions with new values. */
    setSuggestions(values: T[] | null): void;

    /** Accept the currently selected suggestion. */
    useSelectedItem(evt: MouseEvent | KeyboardEvent): void;
}
