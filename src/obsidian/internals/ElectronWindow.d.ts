import type { ElectronBrowserWindow } from '../../electron/internals/ElectronBrowserWindow.d.ts';

/**
 * Extended Electron BrowserWindow with internal properties.
 *
 * @public
 * @unofficial
 */
export interface ElectronWindow extends ElectronBrowserWindow {
  /**
   * Internal browser views attached to the window.
   */
  _browserViews: unknown;

  /**
   * Internal event handlers map.
   */
  _events: unknown;

  /**
   * Number of registered event handlers.
   */
  _eventsCount: unknown;

  /**
   * Web contents for the developer tools panel.
   */
  devToolsWebContents: unknown;

  /**
   * Sets the zoom level of the window frame.
   *
   * @param level - The zoom level to apply. `0` is the default size.
   */
  setFrameZoomLevel(level: number): void;
}
