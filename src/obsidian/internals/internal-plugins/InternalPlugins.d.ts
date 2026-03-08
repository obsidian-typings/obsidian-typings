import type {
    App,
    Debouncer,
    Events
} from 'obsidian';
import type { InternalPlugin } from './InternalPlugin.d.ts';
import type { InternalPluginInstance } from './InternalPluginInstance.d.ts';
import type { InternalPluginNameInstancesMapping } from './InternalPluginNameInstancesMapping.d.ts';
import type { InternalPluginNamePluginsMapping } from './InternalPluginNamePluginsMapping.d.ts';
import type { InternalPluginNameType } from './InternalPluginNameType.d.ts';
import type { InternalPluginsConfigRecord } from './InternalPluginsConfigRecord.d.ts';

/**
 * Manager for all internal (core) plugins, handling registration, enabling, and configuration.
 * @public
 * @unofficial
 */
export interface InternalPlugins extends Events {
    /**
     * Reference to App.
     */
    app: App;

    /**
     * Mapping of whether an internal plugin is enabled.
     */
    config: InternalPluginsConfigRecord;

    /**
     * - Load plugin configs and enable plugins.
     *
     * @returns A promise that resolves when all plugins are enabled.
     */
    enable(): Promise<void>;

    /**
     * Get an enabled internal plugin by ID.
     *
     * @param id - ID of the plugin to get.
     * @returns The plugin instance, or `null` if not enabled.
     */
    getEnabledPluginById<ID extends InternalPluginNameType>(id: ID): InternalPluginNameInstancesMapping[ID] | null;

    /**
     * Get all enabled internal plugins.
     *
     * @returns The list of enabled internal plugins.
     */
    getEnabledPlugins(): InternalPlugin<unknown>[];

    /**
     * Get an internal plugin by ID.
     *
     * @param id - ID of the plugin to get.
     * @returns The internal plugin, or `null` if not found.
     */
    getPluginById<ID extends InternalPluginNameType>(id: ID): InternalPluginNamePluginsMapping[ID] | null;

    /**
     * Load and register an internal plugin instance.
     *
     * @param internalPluginInstance - The plugin instance to load.
     * @returns The loaded plugin instance.
     */
    loadPlugin<Instance extends InternalPluginInstance<unknown>>(internalPluginInstance: Instance): Instance;

    /**
     * Handle raw file change events for the config path.
     *
     * @param configPath - The path of the changed config file.
     */
    onRaw(configPath: string): void;

    /**
     * Plugin configs for internal plugins.
     *
     * @remark Prefer usage of getPluginById to access a plugin.
     */
    plugins: InternalPluginNamePluginsMapping;

    /**
     * Request save of plugin configs.
     */
    requestSaveConfig: Debouncer<[], Promise<void>>;

    /**
     * - Save current plugin configs.
     *
     * @returns A promise that resolves when the config is saved.
     */
    saveConfig(): Promise<void>;
}
