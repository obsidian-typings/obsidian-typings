export {};

import type { CapacitorPlatforms as CapacitorPlatformsInstance } from '@capacitor/core';

declare global {
  /**
   * Registry of available Capacitor platform implementations.
   * @unofficial
   */
  const CapacitorPlatforms: typeof CapacitorPlatformsInstance;
}
