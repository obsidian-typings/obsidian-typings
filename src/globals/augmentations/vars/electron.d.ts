import type { InteropElectronModule as ElectronModule } from '../../../electron/interop/InteropElectronModule.d.ts';

export {};

declare global {
  /**
   * Electron module for desktop platform APIs.
   *
   * @unofficial
   */
  var electron: ElectronModule;
}
