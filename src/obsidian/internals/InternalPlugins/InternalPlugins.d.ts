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
     * - Load plugin configs and enable plugins.
     */
    enable(): Promise<void>;

    /**
     * Get an enabled internal plugin by ID.
     *
     * @param id - ID of the plugin to get.
     */
    getEnabledPluginById<ID extends InternalPluginNameType>(id: ID): InternalPluginNameInstancesMapping[ID] | null;

    /**
     * Get all enabled internal plugins.
     */
    getEnabledPlugins(): InternalPlugin<unknown>[];

    /**
     * Get an internal plugin by ID.
     *
     * @param id - ID of the plugin to get.
     */
    getPluginById<ID extends InternalPluginNameType>(id: ID): InternalPluginNamePluginsMapping[ID] | null;

    /** Load and register an internal plugin instance. */
    loadPlugin<Instance extends InternalPluginInstance<unknown>>(internalPluginInstance: Instance): Instance;

    /** Handle raw file change events for the config path. */
    onRaw(configPath: string): void;

    /**
     * - Save current plugin configs.
     */
    saveConfig(): Promise<void>;
}
