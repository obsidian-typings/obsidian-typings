import type { SearchComponent } from 'obsidian';

/**
 * Search input and visibility controls shared by sidebar navigation headers.
 *
 * @public
 * @unofficial
 */
export interface NavigationSearch {
  /** Button that toggles search visibility. */
  buttonEl: HTMLDivElement;

  /** Whether the search input is visible. */
  isShowing: boolean;

  /** Underlying search input component. */
  searchComponent: SearchComponent;

  /**
   * Get the search text.
   *
   * @returns The current input value.
   */
  getValue(): string;

  /**
   * Hide the input and clear its query.
   */
  hide(): void;

  /**
   * Notify the owner when the user changes visibility.
   *
   * @param showing - Whether the search input is now visible.
   */
  onToggle?(showing: boolean): void;

  /**
   * Set visibility without notifying the owner.
   *
   * @param showing - Whether to show the input.
   */
  setShowing(showing: boolean): void;

  /**
   * Set the search text.
   *
   * @param value - The new input value.
   */
  setValue(value: string): void;

  /**
   * Show, focus and select the input.
   */
  show(): void;

  /**
   * Toggle search visibility.
   */
  toggle(): void;
}
