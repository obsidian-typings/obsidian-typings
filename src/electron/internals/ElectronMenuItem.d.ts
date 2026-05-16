import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';

/**
 * Electron MenuItem for adding items to native application menus.
 *
 * @public
 * @unofficial
 */
export interface ElectronMenuItem {
  /** Whether the menu item is checked. */
  checked: boolean;

  /** Whether the menu item is enabled. */
  enabled: boolean;

  /** The display label of the menu item. */
  label: string;

  /** Whether the menu item is visible. */
  visible: boolean;

  /** The click handler for the menu item. */
  click: (menuItem: ElectronMenuItem, browserWindow: ElectronBrowserWindow | undefined, event: KeyboardEvent) => void;
}
