import type { ElectronAccelerator } from './ElectronAccelerator.d.ts';
import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronMenu } from './ElectronMenu.d.ts';
import type { ElectronMenuItem } from './ElectronMenuItem.d.ts';
import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronSharingItem } from './ElectronSharingItem.d.ts';

/**
 * Options for constructing an Electron {@link ElectronMenuItem}.
 *
 * @public
 * @unofficial
 */
export interface ElectronMenuItemConstructorOptions {
  /** The item's accelerator. */
  accelerator?: ElectronAccelerator;

  /**
   * When `false`, prevents the accelerator from triggering the item if the item is not visible. `darwin` only.
   *
   * @default `true`
   */
  acceleratorWorksWhenHidden?: boolean;

  /** Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. */
  after?: string[];

  /** Declares the placement of this item's containing group after the containing group of the item with the specified label. */
  afterGroupContaining?: string[];

  /** Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the item should be placed in the same group as the referenced item. */
  before?: string[];

  /** Declares the placement of this item's containing group before the containing group of the item with the specified label. */
  beforeGroupContaining?: string[];

  /** Should only be specified for `checkbox` or `radio` type menu items. */
  checked?: boolean;

  /** If `false`, the menu item will be greyed out and unclickable. */
  enabled?: boolean;

  /** The item's icon. */
  icon?: ElectronNativeImage | string;

  /** Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute. */
  id?: string;

  /** The item's visible label. */
  label?: string;

  /**
   * If `false`, the accelerator won't be registered with the system, but it will still be displayed. `linux`/`win32` only.
   *
   * @default `true`
   */
  registerAccelerator?: boolean;

  /** Defines the action of the menu item. When specified the `click` property will be ignored. */
  role?: 'about' | 'appMenu' | 'clearRecentDocuments' | 'close' | 'copy' | 'cut' | 'delete' | 'editMenu' | 'fileMenu' | 'forceReload' | 'front' | 'help' | 'hide' | 'hideOthers' | 'mergeAllWindows' | 'minimize' | 'moveTabToNewWindow' | 'paste' | 'pasteAndMatchStyle' | 'quit' | 'recentDocuments' | 'redo' | 'reload' | 'resetZoom' | 'selectAll' | 'selectNextTab' | 'selectPreviousTab' | 'services' | 'shareMenu' | 'showSubstitutions' | 'startSpeaking' | 'stopSpeaking' | 'toggleDevTools' | 'togglefullscreen' | 'toggleSmartDashes' | 'toggleSmartQuotes' | 'toggleSpellChecker' | 'toggleTabBar' | 'toggleTextReplacement' | 'undo' | 'unhide' | 'viewMenu' | 'window' | 'windowMenu' | 'zoom' | 'zoomIn' | 'zoomOut';

  /** The item to share when the `role` is `shareMenu`. `darwin` only. */
  sharingItem?: ElectronSharingItem;

  /** The item's sublabel. */
  sublabel?: string;

  /** Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a menu then it will be automatically converted to one using `Menu.buildFromTemplate`. */
  submenu?: ElectronMenu | ElectronMenuItemConstructorOptions[];

  /** Hover text for this menu item. `darwin` only. */
  toolTip?: string;

  /** The type of the item. */
  type?: 'checkbox' | 'normal' | 'radio' | 'separator' | 'submenu';

  /** If `false`, the menu item will be entirely hidden. */
  visible?: boolean;

  /**
   * Will be called when the menu item is clicked.
   *
   * @param menuItem - The menu item that was clicked.
   * @param browserWindow - The focused window, or `undefined` if none.
   * @param event - The keyboard event associated with the click.
   * @returns Nothing.
   */
  click?(menuItem: ElectronMenuItem, browserWindow: ElectronBrowserWindow | undefined, event: KeyboardEvent): void;
}
