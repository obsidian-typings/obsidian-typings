import type { ElectronWindow } from '../../../obsidian/internals/ElectronWindow.d.ts';

export {};

declare global {
  /**
   * Electron BrowserWindow instance for the current window.
   * @unofficial
   */
  const electronWindow: ElectronWindow;
}
