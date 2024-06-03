import type {
    EditorSuggest,
    SearchResult
} from "obsidian";
export interface SuggestionContainer<T> {
    /**
     * Which suggestions should be picked from
     */
    chooser: EditorSuggest<T>;
    /**
     * Pop-up element that displays the suggestions
     */
    containerEl: HTMLElement;
    /**
     * The currently focused item
     */
    selectedItem: number;
    /**
     * List of all possible suggestions as elements
     */
    suggestions: HTMLElement[];
    /**
     * List of all possible suggestions as data
     */
    values: SearchResult[];
    /**
     * Amount of suggestions that can be displayed at once within containerEl
     */
    get numVisibleItems(): number;
    /**
     * Height in pixels of the selected item
     */
    get rowHeight(): number;

    /**
     * Add an empty message with provided text
     */
    addMessage(text: string): HTMLElement;
    /**
     * Add suggestion to container
     */
    addSuggestion(suggestion: SearchResult): void;
    /**
     * Set selected item to one specified by index, if keyboard navigation, force scroll into view
     *
     * @remark Prefer setSelectedItem, which clamps the index to within suggestions array
     */
    forceSetSelectedItem(index: number, event: Event): void;
    /**
     * Move selected item to next suggestion
     */
    moveDown(event: KeyboardEvent): boolean;
    /**
     * Move selected item to previous suggestion
     */
    moveUp(event: KeyboardEvent): boolean;
    /**
     * Process click on suggestion item
     */
    onSuggestionClick(event: MouseEvent, element: HTMLElement): void;
    /**
     * Process hover on suggestion item
     */
    onSuggestionMouseover(event: MouseEvent, element: HTMLElement): unknown;
    /**
     * Move selected item to the one in the next 'page' (next visible block)
     */
    pageDown(event: KeyboardEvent): boolean;
    /**
     * Move selected item to the one in the previous 'page' (previous visible block)
     */
    pageUp(event: KeyboardEvent): boolean;
    /**
     * Set selected item to one specified by index, invokes forceSetSelectedItem
     */
    setSelectedItem(index: number, event: Event): void;
    /**
     * Empties original container and adds multiple suggestions
     */
    setSuggestions(suggestions: SearchResult[]): void;
    /**
     * Use currently selected suggestion as the accepted one
     */
    useSelectedItem(event: Event): boolean;
}
