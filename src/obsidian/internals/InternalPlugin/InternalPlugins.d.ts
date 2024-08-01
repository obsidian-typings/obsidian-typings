import type {
    App,
    Events
} from "obsidian";
import type {
    InternalPlugin,
    InternalPluginsConfigRecord,
    InternalPluginNameInstancesMapping,
    InternalPluginNameType
} from "./index.js";

export interface InternalPlugins extends Events {
    /**
     * Reference to App
     */
    app: App;
    /**
     * Mapping of whether an internal plugin is enabled
     */
    config: InternalPluginsConfigRecord;
    /** @internal */
    migration: boolean;
    /**
     * Plugin configs for internal plugins
     *
     * @remark Prefer usage of getPluginById to access a plugin
     */
    plugins: {
        [ID in InternalPluginNameType]: InternalPlugin<
            InternalPluginNameInstancesMapping[ID]
        >;
    };

    /** @internal - Load plugin configs and enable plugins */
    enable(): Promise<void>;
    /**
     * Get an enabled internal plugin by ID
     *
     * @param id - ID of the plugin to get
     */
    getEnabledPluginById<ID extends InternalPluginNameType>(
        id: ID
    ): InternalPluginNameInstancesMapping[ID] | null;
    /**
     * Get all enabled internal plugins
     */
    getEnabledPlugins(): InternalPlugin[];
    /**
     * Get an internal plugin by ID
     *
     * @param id - ID of the plugin to get
     */
    getPluginById<ID extends InternalPluginNameType>(
        id: ID
    ): InternalPlugin<InternalPluginNameInstancesMapping[ID]> | null;
    /** @internal */
    loadPlugin(arg: { id: string; name: string; }): string;
    /** @internal */
    onRaw(cb1: unknown, cb2: unknown): void;
    /** @internal Request save of plugin configs */
    requestSaveConfig(): void;
    /** @internal - Save current plugin configs */
    saveConfig(): Promise<void>;
}
