import type { ElectronModule } from '../../../electron/internals/ElectronModule.d.ts';

export {};

declare global {
  /**
   * Electron module for desktop platform APIs.
   *
   * @unofficial
   */
  var electron: ElectronModule;
}
