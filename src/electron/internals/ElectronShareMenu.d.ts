import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronMenuPopupOptions } from './ElectronMenuPopupOptions.d.ts';
import type { ElectronSharingItem } from './ElectronSharingItem.d.ts';

/**
 * Electron ShareMenu for presenting the native share sheet for a {@link ElectronSharingItem}.
 *
 * @public
 * @unofficial
 */
export declare class ElectronShareMenu {
  /**
   * Create a new instance of {@link ElectronShareMenu}.
   *
   * @param sharingItem - The item to share.
   */
  constructor(sharingItem: ElectronSharingItem);

  /**
   * Closes the context menu in the `browserWindow`.
   *
   * @param browserWindow - The window to close the popup in.
   */
  closePopup(browserWindow?: ElectronBrowserWindow): void;

  /**
   * Pops up this menu as a context menu in the `BrowserWindow`.
   *
   * @param options - Options for the popup including `window`, `x`, and `y`.
   */
  popup(options?: ElectronMenuPopupOptions): void;
}
