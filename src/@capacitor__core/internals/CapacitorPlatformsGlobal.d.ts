import type { CapacitorPlatform } from './CapacitorPlatform.d.ts';

/**
 * Capacitor platforms global.
 *
 * @public
 * @unofficial
 */
export interface CapacitorPlatformsGlobal {
  /** Current platform. */
  currentPlatform: CapacitorPlatform;
  /** Registered platforms. */
  platforms: Map<string, CapacitorPlatform>;

  /**
   * Adds a platform.
   *
   * @param name - Platform name.
   * @param platform - Platform instance.
   */
  addPlatform(name: string, platform: CapacitorPlatform): void;

  /**
   * Sets the current platform.
   *
   * @param name - Platform name.
   */
  setPlatform(name: string): void;
}
