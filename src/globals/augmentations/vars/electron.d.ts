export {};

declare global {
  /**
   * Electron module for desktop platform APIs.
   * @unofficial
   */
  const electron: typeof import('electron');
}
