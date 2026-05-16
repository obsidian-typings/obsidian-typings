// eslint-disable-next-line import-x/no-deprecated -- No other way.
import type { CapacitorPlatforms as CapacitorPlatformsInstance } from '../../../@capacitor__core/internals/vars/CapacitorPlatforms.d.ts';

export {};

declare global {
  /**
   * Registry of available Capacitor platform implementations.
   *
   * @unofficial
   */
  // eslint-disable-next-line import-x/no-deprecated -- No other way.
  var CapacitorPlatforms: typeof CapacitorPlatformsInstance;
}
