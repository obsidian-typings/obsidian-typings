import type { ElectronApp } from './ElectronApp.d.ts';
import type { ElectronClipboard } from './ElectronClipboard.d.ts';
import type { ElectronDialog } from './ElectronDialog.d.ts';
import type { ElectronIpcRenderer } from './ElectronIpcRenderer.d.ts';
import type { ElectronRemote } from './ElectronRemote.d.ts';
import type { ElectronShell } from './ElectronShell.d.ts';

/**
 * The Electron library module type, representing the `window.electron` object.
 *
 * @public
 * @unofficial
 */
export interface ElectronModule {
  /** Electron app instance for managing the application lifecycle. */
  app: ElectronApp;
  /** Electron clipboard instance for accessing system clipboard. */
  clipboard: ElectronClipboard;
  /** Electron dialog instance for showing native system dialogs. */
  dialog: ElectronDialog;
  /** Electron IPC renderer instance for the current renderer process. */
  ipcRenderer: ElectronIpcRenderer;
  /** Electron remote module instance for accessing main process modules. */
  remote: ElectronRemote;
  /** Electron shell instance for managing files and URLs. */
  shell: ElectronShell;
}
