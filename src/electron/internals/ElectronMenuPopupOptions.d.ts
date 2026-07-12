import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';

/**
 * Options for popping up a context menu.
 *
 * @public
 * @unofficial
 */
export interface ElectronMenuPopupOptions {
  /**
   * The index of the menu item to be positioned under the mouse cursor at the specified coordinates. `darwin` only.
   *
   * @default `-1`
   */
  positioningItem?: number;

  /** The window to show the popup in. When omitted, the focused window is used. */
  window?: ElectronBrowserWindow;

  /** The x coordinate. Must be declared if `y` is declared. When omitted, the current mouse cursor position is used. */
  x?: number;

  /** The y coordinate. Must be declared if `x` is declared. When omitted, the current mouse cursor position is used. */
  y?: number;

  /** Called when the menu is closed. */
  callback?(): void;
}
