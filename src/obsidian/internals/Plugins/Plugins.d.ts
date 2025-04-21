import type {
    App,
    Debouncer,
    Plugin,
    PluginManifest
} from 'obsidian';
import type { PluginUpdateManifest } from '../PluginUpdateManifest.d.ts';
import type { PluginsManifestsRecord } from './PluginsManifestsRecord.d.ts';
import type { PluginsPluginsRecord } from './PluginsPluginsRecord.d.ts';

/**
 * @public
 * @unofficial
 */
export interface Plugins {
    /**
     * Reference to App.
     */
    app: App;

    /**
     * Set of enabled plugin IDs.
     *
     * @remark The plugin ids aren't guaranteed to be either active (in `app.plugins.plugins`) or installed (in `app.plugins.manifests`).
     */
    enabledPlugins: Set<string>;

    /**
     * Plugin ID that is currently being enabled.
     */
    loadingPluginId: string | null;

    /**
     * Manifests of all the plugins that are installed.
     */
    manifests: PluginsManifestsRecord;

    /**
     * Mapping of plugin ID to active plugin instance.
     *
     * @remark Prefer usage of getPlugin to access a plugin.
     */
    plugins: PluginsPluginsRecord;

    /** @todo Documentation incomplete. */
    requestSaveConfig: Debouncer<[], Promise<void>>;

    /**
     * Mapping of plugin ID to available updates.
     */
    updates: Map<string, PluginUpdateManifest>;

    /**
     * Check online list for deprecated plugins to automatically disable.
     */
    checkForDeprecations(): Promise<void>;

    /**
     * Check for plugin updates.
     */
    checkForUpdates(): Promise<void>;

    /**
     * Unload a plugin by ID.
     */
    disablePlugin(id: string): Promise<void>;

    /**
     * Unload a plugin by ID and save config for persistence.
     */
    disablePluginAndSave(id: string): Promise<void>;

    /**
     * Enable a plugin by ID.
     */
    enablePlugin(id: string): Promise<void>;

    /**
     * Enable a plugin by ID and save config for persistence.
     */
    enablePluginAndSave(id: string): Promise<void>;

    /**
     * Get a plugin by ID.
     */
    getPlugin(id: string): Plugin | null;

    /**
     * Get the folder where plugins are stored.
     */
    getPluginFolder(): string;

    /**
     * Load plugin manifests and enable plugins from config.
     */
    initialize(): Promise<void>;

    /**
     * Install a plugin from a given URL.
     */
    installPlugin(repo: string, version: string, manifest: PluginManifest): Promise<void>;

    /**
     * Check whether a plugin is deprecated.
     */
    isDeprecated(id: string): boolean;

    /**
     * Check whether community plugins are enabled.
     */
    isEnabled(): boolean;

    /**
     * Load a specific plugin's manifest by its folder path.
     */
    loadManifest(path: string): Promise<void>;

    /**
     * Load all plugin manifests from plugin folder.
     */
    loadManifests(): Promise<void>;

    /**
     * Load a plugin by its ID.
     */
    loadPlugin(id: string): Promise<Plugin>;

    /** @todo Documentation incomplete. */
    onRaw(e: unknown): void;

    /**
     * - Save current plugin configs.
     */
    saveConfig(): Promise<void>;

    /**
     * Toggle whether community plugins are enabled.
     */
    setEnable(enabled: boolean): Promise<void>;

    /**
     * Uninstall a plugin by ID.
     */
    uninstallPlugin(id: string): Promise<void>;

    /**
     * Unload a plugin by ID.
     */
    unloadPlugin(id: string): Promise<void>;
}
