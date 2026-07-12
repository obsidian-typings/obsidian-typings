import type { ElectronAccelerator } from './ElectronAccelerator.d.ts';
import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronMenu } from './ElectronMenu.d.ts';
import type { ElectronMenuItemConstructorOptions } from './ElectronMenuItemConstructorOptions.d.ts';
import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronSharingItem } from './ElectronSharingItem.d.ts';

/**
 * Electron MenuItem for adding items to native application menus.
 *
 * @public
 * @unofficial
 */
export declare class ElectronMenuItem {
  /** The item's accelerator, if set. */
  accelerator?: ElectronAccelerator;

  /** Whether the item is checked. This property can be dynamically changed. */
  checked: boolean;

  /** An item's sequential unique id. */
  commandId: number;

  /** Whether the item is enabled. This property can be dynamically changed. */
  enabled: boolean;

  /** The item's icon, if set. */
  icon?: ElectronNativeImage | string;

  /** The item's unique id. This property can be dynamically changed. */
  id: string;

  /** The item's visible label. */
  label: string;

  /** The menu that the item is a part of. */
  menu: ElectronMenu;

  /** Whether the accelerator should be registered with the system or just displayed. This property can be dynamically changed. */
  registerAccelerator: boolean;

  /** The item's role, if set. */
  role?: 'about' | 'appMenu' | 'clearRecentDocuments' | 'close' | 'copy' | 'cut' | 'delete' | 'editMenu' | 'fileMenu' | 'forceReload' | 'front' | 'help' | 'hide' | 'hideOthers' | 'mergeAllWindows' | 'minimize' | 'moveTabToNewWindow' | 'paste' | 'pasteAndMatchStyle' | 'quit' | 'recentDocuments' | 'redo' | 'reload' | 'resetZoom' | 'selectAll' | 'selectNextTab' | 'selectPreviousTab' | 'services' | 'shareMenu' | 'startSpeaking' | 'stopSpeaking' | 'toggleDevTools' | 'togglefullscreen' | 'toggleSpellChecker' | 'toggleTabBar' | 'undo' | 'unhide' | 'viewMenu' | 'window' | 'windowMenu' | 'zoom' | 'zoomIn' | 'zoomOut';

  /** The item to share when the `role` is `shareMenu`. This property can be dynamically changed. `darwin` only. */
  sharingItem: ElectronSharingItem;

  /** The item's sublabel. */
  sublabel: string;

  /** The menu item's submenu, if present. */
  submenu?: ElectronMenu;

  /** The item's hover text. `darwin` only. */
  toolTip: string;

  /** The type of the item. */
  type: 'checkbox' | 'normal' | 'radio' | 'separator' | 'submenu';

  /** The item's user-assigned accelerator for the menu item. Only initialized after the item has been added to a menu; accessing before initialization returns `null`. `darwin` only. */
  readonly userAccelerator: ElectronAccelerator | null;

  /** Whether the item is visible. This property can be dynamically changed. */
  visible: boolean;

  /**
   * Creates a new menu item.
   *
   * @param options - The menu item options.
   */
  constructor(options: ElectronMenuItemConstructorOptions);

  /**
   * The click handler that is fired when the menu item receives a click event.
   *
   * @param menuItem - The menu item that was clicked.
   * @param browserWindow - The focused window, or `undefined` if none.
   * @param event - The keyboard event associated with the click.
   * @returns Nothing.
   */
  click(menuItem: ElectronMenuItem, browserWindow: ElectronBrowserWindow | undefined, event: KeyboardEvent): void;
}
