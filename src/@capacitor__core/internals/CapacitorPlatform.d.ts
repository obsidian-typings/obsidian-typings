import type { PluginHeader } from './PluginHeader.d.ts';
import type { PluginImplementations } from './PluginImplementations.d.ts';

/**
 * Capacitor platform.
 *
 * @public
 * @unofficial
 */
export interface CapacitorPlatform {
  /** Platform name. */
  name: string;

  /**
   * Gets the platform name.
   *
   * @returns Platform name.
   */
  getPlatform?(): string;

  /**
   * Gets a plugin header.
   *
   * @param pluginName - Plugin name.
   * @returns Plugin header or `undefined`.
   */
  getPluginHeader?(pluginName: string): PluginHeader | undefined;

  /**
   * Checks if the platform is native.
   *
   * @returns Whether the platform is native.
   */
  isNativePlatform?(): boolean;

  /**
   * Checks if a plugin is available.
   *
   * @param pluginName - Plugin name.
   * @returns Whether the plugin is available.
   */
  isPluginAvailable?(pluginName: string): boolean;

  /**
   * Registers a plugin.
   *
   * @param pluginName - Plugin name.
   * @param jsImplementations - Plugin implementations.
   * @returns Registered plugin.
   */
  registerPlugin?(pluginName: string, jsImplementations: PluginImplementations): unknown;
}
