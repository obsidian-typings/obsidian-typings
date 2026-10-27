import type { App } from 'obsidian';

import type { NavigationSearch } from '../../components/NavigationSearch.d.ts';

/**
 * Renders navigation buttons, search and sort controls for a sidebar header.
 *
 * @public
 * @unofficial
 */
export interface HeaderDom {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Container element for navigation buttons.
   */
  navButtonsEl: HTMLDivElement;

  /**
   * Container element for the navigation header.
   */
  navHeaderEl: HTMLDivElement;

  /**
   * Add a navigation button to the header.
   *
   * @param icon - The button icon.
   * @param title - The tooltip text.
   * @param onClick - The click handler.
   * @param className - An additional CSS class.
   * @returns The created navigation button element.
   */
  addNavButton(icon: string, title: string, onClick: ($event: MouseEvent) => unknown, className?: string): HTMLDivElement;

  /**
   * Add a search input with a visibility toggle.
   *
   * @param onChange - The search text change handler.
   * @param onToggle - The visibility change handler.
   * @returns The search input and visibility controls.
   */
  addSearchButton(onChange: (query: string) => unknown, onToggle?: (showing: boolean) => unknown): NavigationSearch;

  /**
   * Add a sort button to the header.
   *
   * @returns The created sort button element.
   */
  addSortButton(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;
}
