import type { Dialog } from './Dialog.d.ts';
import type { ElectronApp } from './ElectronApp.d.ts';
import type { ElectronClipboard } from './ElectronClipboard.d.ts';
import type { IpcRenderer } from './IpcRenderer.d.ts';
import type { Remote } from './Remote.d.ts';
import type { Shell } from './Shell.d.ts';

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
  dialog: Dialog;
  /** Electron IPC renderer instance for the current renderer process. */
  ipcRenderer: IpcRenderer;
  /** Electron remote module instance for accessing main process modules. */
  remote: Remote;
  /** Electron shell instance for managing files and URLs. */
  shell: Shell;
}
