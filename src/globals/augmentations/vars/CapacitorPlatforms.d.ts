import type { CapacitorPlatformsInstance } from '../../../@capacitor__core/internals/CapacitorPlatformsInstance.d.ts';

export {};

declare global {
  /**
   * Registry of available Capacitor platform implementations.
   *
   * @unofficial
   */
  var CapacitorPlatforms: CapacitorPlatformsInstance;
}
