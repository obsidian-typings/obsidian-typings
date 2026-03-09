import type {
  App,
  Scope
} from 'obsidian';

/**
 * Base interface for search components providing find-and-replace UI.
 * @public
 * @unofficial
 */
export interface AbstractSearchComponent {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * The container element in which the search component exists (i.e. Editor).
   */
  containerEl: HTMLElement;

  /**
   * Container for the replacement input field.
   */
  replaceInputEl: HTMLInputElement;

  /**
   * Keyscope for search component.
   */
  scope: Scope;

  /**
   * Container for all the action buttons.
   */
  searchButtonContainerEl: HTMLElement;

  /**
   * Container for the search component itself.
   */
  searchContainerEl: HTMLElement;

  /**
   * Container for the search input field.
   */
  searchInputEl: HTMLInputElement;

  /**
   * Returns the current search query.
   *
   * @returns The current search query string.
   */
  getQuery(): string;

  /**
   * Switch to the next inputElement.
   *
   * @param event - The keyboard event that triggered the input switch.
   * @returns The result of switching to the next input.
   */
  goToNextInput(event: KeyboardEvent): unknown;

  /**
   * Invokes findNextOrReplace.
   *
   * @param event - The keyboard event that triggered the action.
   * @returns The result of the enter action.
   */
  onEnter(event: KeyboardEvent): unknown;

  /**
   * Invokes findPrevious.
   *
   * @param event - The keyboard event that triggered the action.
   * @returns The result of the shift-enter action.
   */
  onShiftEnter(event: KeyboardEvent): unknown;
}
