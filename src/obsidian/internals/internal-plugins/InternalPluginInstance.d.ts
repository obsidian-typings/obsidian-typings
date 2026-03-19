import type { App } from 'obsidian';

/**
 * Base interface for an internal plugin instance, providing lifecycle hooks and metadata.
 *
 * @typeParam InternalPlugin - The type of the internal plugin.
 * @public
 * @unofficial
 */
export interface InternalPluginInstance<InternalPlugin> {
  /** Human-readable description of this plugin. */
  description: string;

  /** Unique identifier for this plugin. */
  id: string;

  /** Human-readable display name of this plugin. */
  name: string;

  /**
   * Initialize the plugin instance with app and plugin references.
   *
   * @param app - The app instance.
   * @param plugin - The internal plugin registration.
   */
  init(app: App, plugin: InternalPlugin): void;

  /**
   * Called when the plugin is disabled.
   *
   * @param app - The app instance.
   * @param plugin - The internal plugin registration.
   */
  onDisable?(app: App, plugin: InternalPlugin): void;

  /**
   * Called when the plugin is enabled.
   *
   * @param app - The app instance.
   * @param plugin - The internal plugin registration.
   */
  onEnable?(app: App, plugin: InternalPlugin): Promise<void>;

  /**
   * Called when the user manually disables the plugin.
   *
   * @param app - The app instance.
   */
  onUserDisable?(app: App): void;

  /**
   * Called when the user manually enables the plugin.
   *
   * @param app - The app instance.
   */
  onUserEnable?(app: App): void;
}
