import type * as Electron from 'electron';

export {};

declare global {
  /** Installed Electron types selected by the explicit integration import. */
  interface ObsidianElectronTypes {
    /** Installed browser window. */
    ElectronBrowserWindow: Electron.BrowserWindow;
    /** Installed IPC renderer, combined with Obsidian's channel overloads at the boundary. */
    ElectronIpcRenderer: Electron.IpcRenderer;
    /** Installed public module exports. */
    ElectronNamespace: typeof import('electron');
    /** Installed web contents. */
    ElectronWebContents: Electron.WebContents;
  }
}
