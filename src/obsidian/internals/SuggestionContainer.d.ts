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
   * Whether hovering a suggestion selects it. While `false`, {@link SuggestionContainer.onSuggestionMouseover} does nothing.
   */
  selectOnHover: boolean;

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
   * @param text - Message text or document fragment to display.
   * @returns The created message element.
   */
  addMessage(text: DocumentFragment | string): HTMLElement;

  /**
   * Add suggestion to container.
   *
   * @param suggestion - Suggestion to add.
   */
  addSuggestion(suggestion: SearchResult): void;

  /**
   * Set selected item to one specified by index, scrolling it into view unless a non-keyboard event
   * triggered the change.
   *
   * @param index - Index of the item to select.
   * @param event - The triggering event, or `null` / omitted to always scroll the selected item into view.
   * @remark Prefer setSelectedItem, which clamps the index to within suggestions array.
   */
  forceSetSelectedItem(index: number, event?: KeyboardEvent | MouseEvent | null): void;

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
  getSelectedValue(): null | SearchResult;

  /**
   * Move selected item to next suggestion.
   *
   * @param event - The keyboard event.
   * @returns False if already at the end, void otherwise.
   */
  moveDown(event: KeyboardEvent): false | void;

  /**
   * Move selected item to previous suggestion.
   *
   * @param event - The keyboard event.
   * @returns False if already at the start, void otherwise.
   */
  moveUp(event: KeyboardEvent): false | void;

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
   * Process hover on suggestion item. Does nothing while {@link SuggestionContainer.selectOnHover} is `false`.
   *
   * @param event - The mouse event.
   * @param element - The hovered suggestion element.
   */
  onSuggestionMouseover(event: MouseEvent, element: HTMLElement): void;

  /**
   * Move selected item to the one in the next 'page' (next visible block).
   *
   * @param event - The keyboard event.
   * @returns False if already at the end, void otherwise.
   */
  pageDown(event: KeyboardEvent): false | void;

  /**
   * Move selected item to the one in the previous 'page' (previous visible block).
   *
   * @param event - The keyboard event.
   * @returns False if already at the start, void otherwise.
   */
  pageUp(event: KeyboardEvent): false | void;

  /**
   * Empty the container and re-render one suggestion element per current value, re-applying the selection.
   */
  renderSuggestions(): void;

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
   * @param event - The triggering event, or `null` / omitted to always scroll the selected item into view.
   */
  setSelectedItem(index: number, event?: KeyboardEvent | MouseEvent | null): void;

  /**
   * Empties original container and adds multiple suggestions.
   *
   * @param suggestions - Suggestions to display.
   */
  setSuggestions(suggestions: SearchResult[]): void;

  /**
   * Set whether hovering a suggestion selects it.
   *
   * @param value - Whether hovering should select.
   * @returns The container instance, for chaining off the constructor.
   */
  shouldSelectOnHover(value: boolean): this;

  /**
   * Use currently selected suggestion as the accepted one.
   *
   * @param event - The triggering event.
   * @returns Whether a suggestion was accepted.
   */
  useSelectedItem(event: KeyboardEvent | MouseEvent): boolean;
}
