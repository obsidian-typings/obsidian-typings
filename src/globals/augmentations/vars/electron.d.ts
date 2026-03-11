import type { default as electron2 } from 'electron';

export {};

declare global {
  /**
   * Electron module for desktop platform APIs.
   * @unofficial
   */
  const electron: typeof electron2;
}
