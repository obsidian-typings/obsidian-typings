import type { BrowserWindow } from 'electron';

/**
 * Extended Electron BrowserWindow with internal properties.
 *
 * @public
 * @unofficial
 */
export interface ElectronWindow extends BrowserWindow {
  /** Internal browser views attached to the window. */
  _browserViews: unknown;

  /** Internal event handlers map. */
  _events: unknown;

  /** Number of registered event handlers. */
  _eventsCount: unknown;

  /** Web contents for the developer tools panel. */
  devToolsWebContents: unknown;
}
