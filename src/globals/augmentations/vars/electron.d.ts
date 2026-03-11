import type { CrossProcessExports } from 'electron';

export {};

declare global {
  /**
   * Electron module for desktop platform APIs.
   * @unofficial
   */
  const electron: CrossProcessExports;
}
