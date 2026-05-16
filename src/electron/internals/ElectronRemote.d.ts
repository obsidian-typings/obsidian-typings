import type { ElectronApp } from './ElectronApp.d.ts';
import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronWebContents } from './ElectronWebContents.d.ts';

/**
 * Electron Remote module for accessing main process modules from the renderer.
 *
 * @public
 * @unofficial
 */
export interface ElectronRemote {
  /** The main process app instance. */
  app: ElectronApp;

  /** The BrowserWindow constructor. */
  BrowserWindow: typeof ElectronBrowserWindow;

  /**
   * Returns the web contents of the current renderer process.
   *
   * @returns The current web contents.
   */
  getCurrentWebContents(): ElectronWebContents;

  /**
   * Returns the BrowserWindow of the current renderer process.
   *
   * @returns The current BrowserWindow.
   */
  getCurrentWindow(): ElectronBrowserWindow;
}
