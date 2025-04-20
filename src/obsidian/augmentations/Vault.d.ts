import type { AppVaultConfig } from '../internals/AppVaultConfig/AppVaultConfig.d.ts';
import type { ConfigItem } from '../internals/ConfigItem.d.ts';
import type { FileSystemWatchHandler } from '../internals/FileSystemWatchHandler.d.ts';
import type { VaultFileMapRecord } from '../internals/VaultFileMapRecord.d.ts';

export {};

declare module 'obsidian' {
    interface Vault extends Events {
        /**
         * Low-level file system adapter for read and write operations.
         *
         * @tutorial Can be used to read binaries, or files not located directly within the vault.
         * @unofficial
         */
        adapter: DataAdapter;

        /**
         * Max size of the cache in bytes
         *
         * @unofficial
         */
        cacheLimit: number;

        /**
         * Object containing all config settings for the vault (editor, appearance, ... settings).
         *
         * @remark Prefer usage of `app.vault.getConfig(key)` to get settings, config does not contain settings that were not changed from their default value.
         * @unofficial
         */
        config: AppVaultConfig;

        /**
         * Timestamp of the last config change
         *
         * @unofficial
         */
        configTs: number;

        /**
         * Mapping of path to Obsidian folder or file structure
         *
         * @unofficial
         */
        fileMap: VaultFileMapRecord;

        /**
         * Listener for all events on the vault
         *
         * @unofficial
         */
        onChange: FileSystemWatchHandler;

        /**
         * Debounced function for saving config
         *
         * @unofficial
         */
        requestSaveConfig: Debouncer<[], Promise<void>>;

        /**
         * The same TFolder object as `.fileMap["/"]`
         *
         * @unofficial
         */
        root: TFolder;

        /**
         * Add file as child/parent to respective folders
         *
         * @unofficial
         */
        addChild(file: TAbstractFile): void;

        /**
         * Check whether new file path is available
         *
         * @unofficial
         */
        checkForDuplicate(file: TAbstractFile, newPath: string): boolean;

        /**
         * Check whether path has valid formatting (no dots/spaces at end, ...)
         *
         * @unofficial
         */
        checkPath(path: string): boolean;

        /**
         * Remove a vault config file
         *
         * @unofficial
         */
        deleteConfigJson(configFile: string): Promise<void>;

        /**
             * Check whether a path exists in the vault.
             *
            @unofficial
             */
        exists(path: string, isCaseSensitive?: boolean): Promise<boolean>;

        /** @unofficial */
        generateFiles(e: AsyncGenerator<TFile>, t: boolean): Promise<void>;

        /**
         * Get an abstract file by path, insensitive to case.
         *
         * @unofficial
         */
        getAbstractFileByPathInsensitive(path: string): TAbstractFile | null;

        /**
         * Get path for file that does not conflict with other existing files
         *
         * @unofficial
         */
        getAvailablePath(path: string, extension: string): string;

        /**
         * Get path for attachment that does not conflict with other existing files
         *
         * @unofficial
         */
        getAvailablePathForAttachments(filename: string, extension: string, file: TFile | null): Promise<string>;

        /**
         * Get value from config by key.
         *
         * @param string Key of config value.
         * @remark Default value will be selected if config value was not manually changed.
         * @unofficial
         */
        getConfig(string: ConfigItem): unknown;

        /**
         * Get path to config file (relative to vault root).
         *
         * @unofficial
         */
        getConfigFile(configFile: string): string;

        /**
         * Get direct parent of file.
         *
         * @param file File to get parent of.
         * @unofficial
         */
        getDirectParent(file: TAbstractFile): TFolder | null;

        /**
         * Check whether files map cache is empty
         *
         * @unofficial
         */
        isEmpty(): boolean;

        /**
         * Iterate over the files and read them
         *
         * @unofficial
         */
        iterateFiles(files: TFile[], cachedRead: boolean): void;

        /**
         * Load vault adapter
         *
         * @unofficial
         */
        load(): Promise<void>;

        /**
         * Called whenever any of Obsidian's settings are changed.
         *
         * @remark Does *not* trigger when a particular plugin's settings are changed, for that, you could monkey-patch the `saveSettings` method of a plugin instance.
         * @unofficial
         */
        on(name: 'config-changed', callback: (configKey: string) => void, ctx?: unknown): EventRef;

        /**
         * Triggered whenever a file gets loaded internally
         *
         * @unofficial
         */
        on(name: 'raw', callback: (path: string) => void, ctx?: unknown): EventRef;

        /**
         * Read a config file from the vault and parse it as JSON.
         *
         * @param config Name of config file.
         * @unofficial
         */
        readConfigJson(config: string): Promise<null | object>;

        /**
         * Read a config file (full path) from the vault and parse it as JSON.
         *
         * @param path Full path to config file.
         * @unofficial
         */
        readJson(path: string): Promise<null | object>;

        /**
         * Read a plugin config file (full path relative to vault root) from the vault and parse it as JSON.
         *
         * @param path Full path to plugin config file.
         * @unofficial
         */
        readPluginData(path: string): Promise<null | object>;

        /**
         * Read a file from the vault as a string.
         *
         * @param path Path to file.
         * @unofficial
         */
        readRaw(path: string): Promise<string>;

        /**
         * Reload all config files
         *
         * @unofficial
         */
        reloadConfig(): void;

        /**
         * Remove file as child/parent from respective folders.
         *
         * @param file File to remove.
         * @unofficial
         */
        removeChild(file: TAbstractFile): void;

        /**
         * Get the file by absolute path.
         *
         * @param path Path to file.
         * @unofficial
         */
        resolveFilePath(path: string): TAbstractFile | null;

        /**
         * Get the file by Obsidian URL
         *
         * @unofficial
         */
        resolveFileUrl(url: string): TAbstractFile | null;

        /**
         * Save app and appearance configs to disk
         *
         * @unofficial
         */
        saveConfig(): Promise<void>;

        /**
         * Set value of config by key.
         *
         * @param key Key of config value.
         * @param value Value to set.
         * @unofficial
         */
        setConfig(key: ConfigItem, value: unknown): void;

        /**
         * Set where the config files are stored (relative to vault root).
         *
         * @param configDir Path to config files.
         * @unofficial
         */
        setConfigDir(configDir: string): void;

        /**
         * Set file cache limit
         *
         * @unofficial
         */
        setFileCacheLimit(limit: number): void;

        /**
         * Load all config files into memory
         *
         * @unofficial
         */
        setupConfig(): Promise<void>;

        /**
         * Write a config file to disk.
         *
         * @param config Name of config file.
         * @param data Data to write.
         * @unofficial
         */
        writeConfigJson(config: string, data: object): Promise<void>;

        /**
         * Write a config file (full path) to disk.
         *
         * @param path Full path to config file.
         * @param data Data to write.
         * @param pretty Whether to insert tabs or spaces.
         * @unofficial
         */
        writeJson(path: string, data: object, pretty?: boolean): Promise<void>;

        /**
         * Write a plugin config file (path relative to vault root) to disk.
         *
         * @unofficial
         */
        writePluginData(path: string, data: object): Promise<void>;
    }
}
