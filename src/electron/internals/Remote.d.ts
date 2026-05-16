import type { BrowserWindow } from './BrowserWindow.d.ts';
import type { ElectronApp } from './ElectronApp.d.ts';
import type { WebContents } from './WebContents.d.ts';

/**
 * Electron Remote module for accessing main process modules from the renderer.
 *
 * @public
 * @unofficial
 */
export interface Remote {
  /** The main process app instance. */
  app: ElectronApp;

  /** The BrowserWindow constructor. */
  BrowserWindow: typeof BrowserWindow;

  /**
   * Returns the web contents of the current renderer process.
   *
   * @returns The current web contents.
   */
  getCurrentWebContents(): WebContents;

  /**
   * Returns the BrowserWindow of the current renderer process.
   *
   * @returns The current BrowserWindow.
   */
  getCurrentWindow(): BrowserWindow;
}
