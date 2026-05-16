import type { BrowserWindow } from './BrowserWindow.d.ts';
import type { ElectronMenuItem } from './ElectronMenuItem.d.ts';

/**
 * Electron Menu for creating native application menus and context menus.
 *
 * @public
 * @unofficial
 */
export interface ElectronMenu {
  /** The menu items in this menu. */
  items: ElectronMenuItem[];

  /**
   * Appends a menu item to the menu.
   *
   * @param menuItem - The menu item to append.
   */
  append(menuItem: ElectronMenuItem): void;

  /**
   * Closes the popup menu in the given window.
   *
   * @param browserWindow - The window to close the popup in.
   */
  closePopup(browserWindow?: BrowserWindow): void;

  /**
   * Inserts a menu item at the specified position.
   *
   * @param pos - The position to insert at.
   * @param menuItem - The menu item to insert.
   */
  insert(pos: number, menuItem: ElectronMenuItem): void;

  /* eslint-disable jsdoc/check-param-names -- TSDoc does not support dot-notation sub-params. */
  /**
   * Pops up the context menu.
   *
   * @param options - Options for the popup including `window`, `x`, and `y`.
   */
  popup(options?: { window?: BrowserWindow; x?: number; y?: number }): void;
  /* eslint-enable jsdoc/check-param-names -- Re-enable after inline object param. */
}
