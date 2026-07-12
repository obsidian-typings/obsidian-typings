import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronMenuItem } from './ElectronMenuItem.d.ts';
import type { ElectronMenuItemConstructorOptions } from './ElectronMenuItemConstructorOptions.d.ts';
import type { ElectronMenuPopupOptions } from './ElectronMenuPopupOptions.d.ts';

/**
 * Electron Menu for creating native application menus and context menus.
 *
 * @public
 * @unofficial
 */
export declare class ElectronMenu {
  /**
   * A `MenuItem[]` array containing the menu's items.
   *
   * Each menu consists of multiple menu items and each menu item can have a submenu.
   */
  items: ElectronMenuItem[];

  /** Create a new instance of {@link ElectronMenu}. */
  constructor();

  /**
   * Registers an event listener that is invoked when a popup is closed either manually or with {@link ElectronMenu.closePopup}.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This menu instance.
   */
  addListener(event: 'menu-will-close', listener: (event: ElectronEvent) => void): this;
  /**
   * Registers an event listener that is invoked when {@link ElectronMenu.popup} is called.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This menu instance.
   */
  addListener(event: 'menu-will-show', listener: (event: ElectronEvent) => void): this;

  /**
   * Appends the `menuItem` to the menu.
   *
   * @param menuItem - The menu item to append.
   */
  append(menuItem: ElectronMenuItem): void;

  /**
   * Generally, the `template` is an array of options for constructing a menu item.
   *
   * You can also attach other fields to the elements of the `template` and they will become properties of the constructed menu items.
   *
   * @param template - The template describing the menu items.
   * @returns The constructed menu.
   */
  static buildFromTemplate(template: Array<ElectronMenuItem | ElectronMenuItemConstructorOptions>): ElectronMenu;

  /**
   * Closes the context menu in the `browserWindow`.
   *
   * @param browserWindow - The window to close the popup in.
   */
  closePopup(browserWindow?: ElectronBrowserWindow): void;

  /**
   * Returns the application menu, if set, or `null`, if not set.
   *
   * The returned menu instance doesn't support dynamic addition or removal of menu items. Instance properties can still be dynamically modified.
   *
   * @returns The application menu, or `null` if not set.
   */
  static getApplicationMenu(): ElectronMenu | null;

  /**
   * Returns the item with the specified `id`.
   *
   * @param id - The id of the menu item.
   * @returns The matching menu item, or `null` if not found.
   */
  getMenuItemById(id: string): ElectronMenuItem | null;

  /**
   * Inserts the `menuItem` to the `pos` position of the menu.
   *
   * @param pos - The position to insert at.
   * @param menuItem - The menu item to insert.
   */
  insert(pos: number, menuItem: ElectronMenuItem): void;

  /**
   * Registers an event listener that is invoked when a popup is closed either manually or with {@link ElectronMenu.closePopup}.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This menu instance.
   */
  on(event: 'menu-will-close', listener: (event: ElectronEvent) => void): this;
  /**
   * Registers an event listener that is invoked when {@link ElectronMenu.popup} is called.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This menu instance.
   */
  on(event: 'menu-will-show', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a one-time event listener that is invoked when a popup is closed either manually or with {@link ElectronMenu.closePopup}.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This menu instance.
   */
  once(event: 'menu-will-close', listener: (event: ElectronEvent) => void): this;
  /**
   * Registers a one-time event listener that is invoked when {@link ElectronMenu.popup} is called.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This menu instance.
   */
  once(event: 'menu-will-show', listener: (event: ElectronEvent) => void): this;

  /**
   * Pops up this menu as a context menu in the `BrowserWindow`.
   *
   * @param options - Options for the popup including `window`, `x`, and `y`.
   */
  popup(options?: ElectronMenuPopupOptions): void;

  /**
   * Removes the event listener for a menu popup being closed.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This menu instance.
   */
  removeListener(event: 'menu-will-close', listener: (event: ElectronEvent) => void): this;
  /**
   * Removes the event listener for a menu popup being shown.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This menu instance.
   */
  removeListener(event: 'menu-will-show', listener: (event: ElectronEvent) => void): this;

  /**
   * Sends the `action` to the first responder of application. This is used for emulating default macOS menu behaviors. Usually you would use the `role` property of a menu item. `darwin` only.
   *
   * @param action - The action to send to the first responder.
   */
  static sendActionToFirstResponder(action: string): void;

  /**
   * Sets `menu` as the application menu on macOS. On Windows and Linux, the `menu` will be set as each window's top menu.
   *
   * Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.
   *
   * @param menu - The menu to set, or `null` to suppress the default menu.
   */
  static setApplicationMenu(menu: ElectronMenu | null): void;
}
