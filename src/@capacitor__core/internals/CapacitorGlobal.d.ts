import type { CapacitorException } from './CapacitorException.d.ts';
import type { PluginCallback } from './PluginCallback.d.ts';
import type { PluginListenerHandle } from './PluginListenerHandle.d.ts';
import type { PluginRegistry } from './PluginRegistry.d.ts';
import type { RegisterPlugin } from './RegisterPlugin.d.ts';

/**
 * Capacitor global instance.
 *
 * @public
 * @unofficial
 */
export interface CapacitorGlobal {
  /** Whether debug mode is enabled. */
  DEBUG?: boolean;
  /** Capacitor exception class. */
  Exception: typeof CapacitorException;
  /** Whether logging is enabled. */
  isLoggingEnabled?: boolean;
  /** Whether the platform is native. `@deprecated` Deprecated. */
  isNative?: boolean;
  /** Platform name. `@deprecated` Deprecated. */
  platform?: string;
  /** Plugin registry. `@deprecated` Deprecated. */
  Plugins: PluginRegistry;
  /** Plugin registration function. */
  registerPlugin: RegisterPlugin;

  /**
   * Adds a listener for a plugin event.
   *
   * @param pluginName - Plugin name.
   * @param eventName - Event name.
   * @param callback - Event callback.
   * @returns Plugin listener handle.
   */
  addListener?(pluginName: string, eventName: string, callback: PluginCallback): PluginListenerHandle;

  /**
   * Converts a file path to a source URL.
   *
   * @param filePath - File path.
   * @returns Source URL.
   */
  convertFileSrc(filePath: string): string;

  /**
   * Gets the current platform name.
   *
   * @returns Platform name.
   */
  getPlatform(): string;

  /**
   * Checks if the platform is native.
   *
   * @returns Whether the platform is native.
   */
  isNativePlatform(): boolean;

  /**
   * Checks if a plugin is available.
   *
   * @param name - Plugin name.
   * @returns Whether the plugin is available.
   */
  isPluginAvailable(name: string): boolean;

  /**
   * No-op for plugin methods.
   *
   * @param target - Target object.
   * @param key - Property key.
   * @param pluginName - Plugin name.
   * @returns Never-resolving promise.
   * @deprecated Deprecated.
   */
  pluginMethodNoop(target: unknown, key: PropertyKey, pluginName: string): Promise<never>;

  /**
   * Removes a listener for a plugin event.
   *
   * @param pluginName - Plugin name.
   * @param callbackId - Callback ID.
   * @param eventName - Event name.
   * @param callback - Event callback.
   */
  removeListener?(pluginName: string, callbackId: string, eventName: string, callback: PluginCallback): void;
}
