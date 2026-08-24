/**
 * Chooser component for a suggest modal, managing suggestion selection and navigation.
 *
 * @typeParam T - The type of the suggestion items.
 * @typeParam TModal - The type of the modal.
 * @public
 * @unofficial
 */
export interface SuggestModalChooser<T, TModal> {
  /**
   * Reference to the owning modal.
   */
  chooser: TModal;

  /**
   * Container element for the suggestion list.
   */
  containerEl: HTMLDivElement;

  /**
   * Index of the currently selected suggestion.
   */
  selectedItem: number;

  /**
   * Whether hovering a suggestion selects it. While `false`, {@link SuggestModalChooser.onSuggestionMouseover} does nothing.
   */
  selectOnHover: boolean;

  /**
   * DOM elements for each suggestion row.
   */
  suggestions: HTMLDivElement[];

  /**
   * Current suggestion values, or `null` if none.
   */
  values: null | T[];

  /**
   * Display a message in the suggestion list.
   *
   * @param text - Message text or document fragment to display.
   * @returns The created message element.
   */
  addMessage(text: DocumentFragment | string): HTMLDivElement;

  /**
   * Add a suggestion value to the list.
   *
   * @param value - Suggestion value to add.
   */
  addSuggestion(value: T): void;

  /**
   * Set the selected item by index, scrolling it into view unless a non-keyboard event triggered the change.
   *
   * @param index - Index of the item to select.
   * @param evt - The triggering event, or `null` / omitted to always scroll the selected item into view.
   */
  forceSetSelectedItem(index: number, evt?: KeyboardEvent | MouseEvent | null): void;

  /**
   * Get the DOM element of the currently selected suggestion.
   *
   * @returns The selected element, or `null`.
   */
  getSelectedElement(): HTMLDivElement | null;

  /**
   * Get the value of the currently selected suggestion.
   *
   * @returns The selected value, or `null`.
   */
  getSelectedValue(): null | T;

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
   * Number of suggestions visible at once.
   *
   * @returns The number of visible items.
   */
  get numVisibleItems(): number;

  /**
   * Handle click on a suggestion element.
   *
   * @param evt - The mouse event.
   * @param suggestion - The clicked suggestion element.
   */
  onSuggestionClick(evt: MouseEvent, suggestion: HTMLDivElement): void;

  /**
   * Handle mouseover on a suggestion element. Does nothing while {@link SuggestModalChooser.selectOnHover} is `false`.
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
   * Empty the container and re-render one suggestion element per current value, re-applying the selection.
   */
  renderSuggestions(): void;

  /**
   * Height of each suggestion row in pixels.
   *
   * @returns The row height in pixels.
   */
  get rowHeight(): number;

  /**
   * Set the selected item by index, clamping the index to within the suggestions array.
   *
   * @param index - Index of the item to select.
   * @param evt - The triggering event, or `null` / omitted to always scroll the selected item into view.
   */
  setSelectedItem(index: number, evt?: KeyboardEvent | MouseEvent | null): void;

  /**
   * Replace all suggestions with new values.
   *
   * @param values - Suggestion values to display, or `null`.
   */
  setSuggestions(values: null | T[]): void;

  /**
   * Set whether hovering a suggestion selects it.
   *
   * @param value - Whether hovering should select.
   * @returns The chooser instance, for chaining off the constructor.
   */
  shouldSelectOnHover(value: boolean): this;

  /**
   * Accept the currently selected suggestion.
   *
   * @param evt - The triggering event.
   * @returns Whether a suggestion was accepted.
   */
  useSelectedItem(evt: KeyboardEvent | MouseEvent): boolean;
}
