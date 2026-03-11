import type { FrameDom } from '../../../obsidian/internals/FrameDom.d.ts';

export {};

declare global {
  /**
   * Electron BrowserWindow instance for the current window.
   * @unofficial
   */
  const frameDom: FrameDom;
}
