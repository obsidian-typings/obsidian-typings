import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronMenuItem } from './ElectronMenuItem.d.ts';
import type { ElectronMenuPopupOptions } from './ElectronMenuPopupOptions.d.ts';

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
  closePopup(browserWindow?: ElectronBrowserWindow): void;

  /**
   * Inserts a menu item at the specified position.
   *
   * @param pos - The position to insert at.
   * @param menuItem - The menu item to insert.
   */
  insert(pos: number, menuItem: ElectronMenuItem): void;

  /**
   * Pops up the context menu.
   *
   * @param options - Options for the popup including `window`, `x`, and `y`.
   */
  popup(options?: ElectronMenuPopupOptions): void;
}
