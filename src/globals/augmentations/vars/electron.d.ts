import type { default as electronInstance } from 'electron';

export {};

declare global {
  /**
   * Electron module for desktop platform APIs.
   * @unofficial
   */
  const electron: typeof electronInstance;
}
