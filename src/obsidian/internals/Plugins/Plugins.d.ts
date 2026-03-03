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
 * Manager for community plugins, handling installation, enabling, and lifecycle.
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

    /** Debounced function to save the plugin configuration. */
    requestSaveConfig: Debouncer<[], Promise<void>>;

    /**
     * Mapping of plugin ID to available updates.
     */
    updates: Map<string, PluginUpdateManifest>;

    /**
     * Check online list for deprecated plugins to automatically disable.
     *
     * @returns A promise that resolves when the deprecation check is complete.
     */
    checkForDeprecations(): Promise<void>;

    /**
     * Check for plugin updates.
     *
     * @returns A promise that resolves when the update check is complete.
     */
    checkForUpdates(): Promise<void>;

    /**
     * Unload a plugin by ID.
     *
     * @param id - Plugin ID.
     * @returns A promise that resolves when the plugin is disabled.
     */
    disablePlugin(id: string): Promise<void>;

    /**
     * Unload a plugin by ID and save config for persistence.
     *
     * @param id - Plugin ID.
     * @returns A promise that resolves when the plugin is disabled and the config is saved.
     */
    disablePluginAndSave(id: string): Promise<void>;

    /**
     * Enable a plugin by ID.
     *
     * @param id - Plugin ID.
     * @returns A promise that resolves when the plugin is enabled.
     */
    enablePlugin(id: string): Promise<void>;

    /**
     * Enable a plugin by ID and save config for persistence.
     *
     * @param id - Plugin ID.
     * @returns A promise that resolves when the plugin is enabled and the config is saved.
     */
    enablePluginAndSave(id: string): Promise<void>;

    /**
     * Get a plugin by ID.
     *
     * @param id - Plugin ID.
     * @returns The plugin instance or null if not found.
     */
    getPlugin(id: string): Plugin | null;

    /**
     * Get the folder where plugins are stored.
     *
     * @returns Path to the plugins folder.
     */
    getPluginFolder(): string;

    /**
     * Load plugin manifests and enable plugins from config.
     *
     * @returns A promise that resolves when initialization is complete.
     */
    initialize(): Promise<void>;

    /**
     * Install a plugin from a given URL.
     *
     * @param repo - Repository identifier.
     * @param version - Version to install.
     * @param manifest - Plugin manifest data.
     * @returns A promise that resolves when the plugin is installed.
     */
    installPlugin(repo: string, version: string, manifest: PluginManifest): Promise<void>;

    /**
     * Check whether a plugin is deprecated.
     *
     * @param id - Plugin ID.
     * @returns Whether the plugin is deprecated.
     */
    isDeprecated(id: string): boolean;

    /**
     * Check whether community plugins are enabled.
     *
     * @returns Whether community plugins are enabled.
     */
    isEnabled(): boolean;

    /**
     * Load a specific plugin's manifest by its folder path.
     *
     * @param path - Folder path containing the manifest.
     * @returns A promise that resolves when the manifest is loaded.
     */
    loadManifest(path: string): Promise<void>;

    /**
     * Load all plugin manifests from plugin folder.
     *
     * @returns A promise that resolves when all manifests are loaded.
     */
    loadManifests(): Promise<void>;

    /**
     * Load a plugin by its ID.
     *
     * @param id - Plugin ID.
     * @returns The loaded plugin instance.
     */
    loadPlugin(id: string): Promise<Plugin>;

    /**
     * Handle raw file system change events for plugin config files.
     *
     * @param e - The raw file system change event.
     * @unofficial
     */
    onRaw(e: unknown): void;

    /**
     * - Save current plugin configs.
     *
     * @returns A promise that resolves when the config is saved.
     */
    saveConfig(): Promise<void>;

    /**
     * Toggle whether community plugins are enabled.
     *
     * @param enabled - Whether to enable community plugins.
     * @returns A promise that resolves when the setting is applied.
     */
    setEnable(enabled: boolean): Promise<void>;

    /**
     * Uninstall a plugin by ID.
     *
     * @param id - Plugin ID.
     * @returns A promise that resolves when the plugin is uninstalled.
     */
    uninstallPlugin(id: string): Promise<void>;

    /**
     * Unload a plugin by ID.
     *
     * @param id - Plugin ID.
     * @returns A promise that resolves when the plugin is unloaded.
     */
    unloadPlugin(id: string): Promise<void>;
}
