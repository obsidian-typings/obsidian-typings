// eslint-disable-next-line import-x/no-deprecated -- No other way.
import type { CapacitorPlatforms as CapacitorPlatformsInstance } from '@capacitor/core';

export {};

declare global {
  /**
   * Registry of available Capacitor platform implementations.
   * @unofficial
   */
  // eslint-disable-next-line import-x/no-deprecated -- No other way.
  const CapacitorPlatforms: typeof CapacitorPlatformsInstance;
}
