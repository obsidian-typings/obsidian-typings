import type { AppVaultConfig } from '../internals/AppVaultConfig/AppVaultConfig.js';
import type { ConfigItem } from '../internals/ConfigItem.js';
import type { FileSystemWatchHandler } from '../internals/FileSystemWatchHandler.js';
import type { VaultFileMapRecord } from '../internals/VaultFileMapRecord.js';

export {};

declare module 'obsidian' {
    interface Vault extends Events {
        /**
         * Low-level file system adapter for read and write operations
         *
         * @tutorial Can be used to read binaries, or files not located directly within the vault
         */
        adapter: DataAdapter;
        /** @internal Max size of the cache in bytes */
        cacheLimit: number;
        /**
         * Object containing all config settings for the vault (editor, appearance, ... settings)
         *
         * @remark Prefer usage of `app.vault.getConfig(key)` to get settings, config does not contain settings that were not changed from their default value
         */
        config: AppVaultConfig;
        /** @internal Timestamp of the last config change */
        configTs: number;
        /** @internal Mapping of path to Obsidian folder or file structure */
        fileMap: VaultFileMapRecord;
        /** @internal Listener for all events on the vault */
        onChange: FileSystemWatchHandler;

        /** @internal Add file as child/parent to respective folders */
        addChild(file: TAbstractFile): void;
        /** @internal Check whether new file path is available */
        checkForDuplicate(file: TAbstractFile, newPath: string): boolean;
        /** @internal Check whether path has valid formatting (no dots/spaces at end, ...) */
        checkPath(path: string): boolean;
        /** @internal Remove a vault config file */
        deleteConfigJson(configFile: string): Promise<void>;
        /**
         * Check whether a path exists in the vault
         */
        exists(path: string, isCaseSensitive?: boolean): Promise<boolean>;
        /** @internal */
        generateFiles(e: AsyncGenerator<TFile>, t: boolean): Promise<void>;
        /**
         * Get an abstract file by path, insensitive to case
         */
        getAbstractFileByPathInsensitive(path: string): TAbstractFile | null;
        /** @internal Get path for file that does not conflict with other existing files */
        getAvailablePath(path: string, extension: string): string;
        /** @internal Get path for attachment that does not conflict with other existing files */
        getAvailablePathForAttachments(filename: string, extension: string, file: TFile | null): Promise<string>;
        /**
         * Get value from config by key
         *
         * @param string Key of config value
         * @remark Default value will be selected if config value was not manually changed
         */
        getConfig(string: ConfigItem): unknown;
        /**
         * Get path to config file (relative to vault root)
         */
        getConfigFile(configFile: string): string;
        /**
         * Get direct parent of file
         *
         * @param file File to get parent of
         */
        getDirectParent(file: TAbstractFile): TFolder | null;
        /** @internal Check whether files map cache is empty */
        isEmpty(): boolean;
        /** @internal Iterate over the files and read them */
        iterateFiles(files: TFile[], cachedRead: boolean): void;
        /** @internal Load vault adapter */
        load(): Promise<void>;
        /**
         * Called whenever any of Obsidian's settings are changed
         *
         * @remark Does *not* trigger when a particular plugin's settings are changed, for that, you could monkey-patch the `saveSettings` method of a plugin instance
         */
        on(name: 'config-changed', callback: () => void, ctx?: unknown): EventRef;
        /** @internal Triggered whenever a file gets loaded internally */
        on(name: 'raw', callback: (path: string) => void, ctx?: unknown): EventRef;
        /**
         * Read a config file from the vault and parse it as JSON
         *
         * @param config Name of config file
         */
        readConfigJson(config: string): Promise<null | object>;
        /**
         * Read a config file (full path) from the vault and parse it as JSON
         *
         * @param path Full path to config file
         */
        readJson(path: string): Promise<null | object>;
        /**
         * Read a plugin config file (full path relative to vault root) from the vault and parse it as JSON
         *
         * @param path Full path to plugin config file
         */
        readPluginData(path: string): Promise<null | object>;
        /**
         * Read a file from the vault as a string
         *
         * @param path Path to file
         */
        readRaw(path: string): Promise<string>;
        /** @internal Reload all config files */
        reloadConfig(): void;
        /**
         * @param file File to remove
         * @internal Remove file as child/parent from respective folders
         */
        removeChild(file: TAbstractFile): void;
        /** @internal Debounced function for saving config */
        requestSaveConfig(): Debouncer<[], Promise<void>>;
        /**
         * @param path Path to file
         * @internal Get the file by absolute path
         */
        resolveFilePath(path: string): TAbstractFile | null;
        /** @internal Get the file by Obsidian URL */
        resolveFileUrl(url: string): TAbstractFile | null;
        /** @internal Save app and appearance configs to disk */
        saveConfig(): Promise<void>;
        /**
         * Set value of config by key
         *
         * @param key Key of config value
         * @param value Value to set
         */
        setConfig(key: ConfigItem, value: unknown): void;
        /**
         * Set where the config files are stored (relative to vault root)
         *
         * @param configDir Path to config files
         */
        setConfigDir(configDir: string): void;
        /** @internal Set file cache limit */
        setFileCacheLimit(limit: number): void;
        /** @internal Load all config files into memory */
        setupConfig(): Promise<void>;
        /**
         * Write a config file to disk
         *
         * @param config Name of config file
         * @param data Data to write
         */
        writeConfigJson(config: string, data: object): Promise<void>;
        /**
         * Write a config file (full path) to disk
         *
         * @param path Full path to config file
         * @param data Data to write
         * @param pretty Whether to insert tabs or spaces
         */
        writeJson(path: string, data: object, pretty?: boolean): Promise<void>;
        /**
         * Write a plugin config file (path relative to vault root) to disk
         */
        writePluginData(path: string, data: object): Promise<void>;
    }
}
