import type {
  App,
  BasesEntry,
  Component,
  Debouncer,
  QueryController,
  Scope
} from 'obsidian';

/**
 * The search menu of a {@link QueryController}'s toolbar, providing the in-view search bar that filters
 * results by a full-text query.
 *
 * @public
 * @unofficial
 */
export interface BasesSearchMenu extends Component {
  /**
   * Whether the search bar is currently open.
   */
  _isOpen: boolean;

  /**
   * The app instance.
   */
  app: App;

  /**
   * The toolbar button that toggles the search bar.
   */
  button: unknown;

  /**
   * The element displaying the search result count.
   */
  countEl: HTMLDivElement;

  /**
   * The search input element.
   */
  inputEl: HTMLInputElement;

  /**
   * The owning query controller.
   */
  queryController: QueryController;

  /**
   * The keyboard scope active while the search bar is open (registers `Escape` to close it).
   */
  scope: Scope;

  /**
   * The search bar container element.
   */
  searchBarEl: HTMLDivElement;

  /**
   * Debounced update that pushes the typed query to the controller via {@link QueryController.updateSearchQuery}.
   */
  update: Debouncer<[string], void>;

  /**
   * Closes the search bar.
   */
  close(): void;

  /**
   * Opens the search bar, focuses the input, and pushes the keyboard scope.
   */
  open(): void;

  /**
   * Toggles the search bar open or closed.
   */
  toggle(): void;

  /**
   * Updates the displayed result count.
   *
   * @param entries - The filtered entries whose count to display.
   */
  updateCount(entries: BasesEntry[]): void;
}
