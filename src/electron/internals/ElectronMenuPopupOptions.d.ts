import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';

/**
 * Options for popping up a context menu.
 *
 * @public
 * @unofficial
 */
export interface ElectronMenuPopupOptions {
  /** The window to show the popup in. */
  window?: ElectronBrowserWindow;

  /** The x coordinate. */
  x?: number;

  /** The y coordinate. */
  y?: number;
}
