import type { App } from 'obsidian';

/**
 * Base interface for an internal plugin instance, providing lifecycle hooks and metadata.
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

    /** Initialize the plugin instance with app and plugin references. */
    init(app: App, plugin: InternalPlugin): void;

    /** Called when the plugin is disabled. */
    onDisable?(app: App, plugin: InternalPlugin): void;

    /** Called when the plugin is enabled. */
    onEnable?(app: App, plugin: InternalPlugin): Promise<void>;

    /** Called when the user manually disables the plugin. */
    onUserDisable?(app: App): void;

    /** Called when the user manually enables the plugin. */
    onUserEnable?(app: App): void;
}
