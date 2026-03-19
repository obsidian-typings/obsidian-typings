export {};

declare global {
  /**
   * Electron module for desktop platform APIs.
   * @unofficial
   */
  var electron: typeof import('electron');
}
