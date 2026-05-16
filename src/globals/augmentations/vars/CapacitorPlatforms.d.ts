import type { CapacitorPlatformsGlobal } from '../../../@capacitor__core/internals/CapacitorPlatformsGlobal.d.ts';

export {};

declare global {
  /**
   * Registry of available Capacitor platform implementations.
   *
   * @unofficial
   */
  var CapacitorPlatforms: CapacitorPlatformsGlobal;
}
