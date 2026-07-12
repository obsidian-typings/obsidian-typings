import type { ElectronClipboard } from './ElectronClipboard.d.ts';
import type { ElectronContextBridge } from './ElectronContextBridge.d.ts';
import type { ElectronCrashReporter } from './ElectronCrashReporter.d.ts';
import type { ElectronIpcRenderer } from './ElectronIpcRenderer.d.ts';
import type { ElectronNativeImageModule } from './ElectronNativeImageModule.d.ts';
import type { ElectronRemote } from './ElectronRemote.d.ts';
import type { ElectronShell } from './ElectronShell.d.ts';
import type { ElectronWebFrame } from './ElectronWebFrame.d.ts';

/**
 * The Electron library module type, representing the `window.electron` object.
 *
 * @public
 * @unofficial
 */
export interface ElectronModule {
  /** Electron clipboard instance for accessing the system clipboard. */
  clipboard: ElectronClipboard;

  /** Electron `contextBridge` module for exposing APIs across isolated worlds. */
  contextBridge: ElectronContextBridge;

  /** Electron `crashReporter` module for submitting crash reports. */
  crashReporter: ElectronCrashReporter;

  /** Electron IPC renderer instance for the current renderer process. */
  ipcRenderer: ElectronIpcRenderer;

  /** Electron `nativeImage` module for creating images from files, buffers, and data URLs. */
  nativeImage: ElectronNativeImageModule;

  /** Electron remote module instance for accessing main process modules. */
  remote: ElectronRemote;

  /** Electron shell instance for managing files and URLs. */
  shell: ElectronShell;

  /** Electron `webFrame` module for controlling the current renderer frame. */
  webFrame: ElectronWebFrame;
}
