import type { AppVaultConfig } from '../internals/AppVaultConfig/AppVaultConfig.d.ts';
import type { ConfigItem } from '../internals/ConfigItem.d.ts';
import type { FileSystemWatchHandler } from '../internals/FileSystemWatchHandler.d.ts';
import type { VaultFileMapRecord } from '../internals/VaultFileMapRecord.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Work with files and folders stored inside a vault.
     * @see {@link https://docs.obsidian.md/Plugins/Vault}.
     * @since 0.9.7
     */
    interface Vault extends Events {
        /**
         * The low-level adapter of the vault.
         *
         * @official
         * @since 0.9.7
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
         * Gets the path to the config folder.
         * This value is typically `.obsidian` but it could be different.
         *
         * @official
         * @since 0.11.1
         */
        configDir: string;

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
         * Add text to the end of a plaintext file inside the vault.
         *
         * @param file - The file.
         * @param data - The text to append.
         * @param options - Write options.
         * @returns The promise that resolves when the text is appended.
         * @official
         * @since 0.13.0
         */
        append(file: TFile, data: string, options?: DataWriteOptions): Promise<void>;

        /**
         * Read the content of a plaintext file stored inside the vault.
         * Use this if you only want to display the content to the user.
         * If you want to modify the file content afterward use {@link Vault.read}
         *
         * @param file - The file to read.
         * @returns The promise that resolves to the cached file content.
         * @official
         * @since 0.9.7
         */
        cachedRead(file: TFile): Promise<string>;

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
         * Create a copy of a file or folder.
         *
         * @param file - The file or folder.
         * @param newPath - Vault absolute path for the new copy.
         * @returns The promise that resolves to the new copy.
         * @official
         * @since 1.8.7
         */
        copy<T extends TAbstractFile>(file: T, newPath: string): Promise<T>;

        /**
         * Create a new plaintext file inside the vault.
         *
         * @param path - Vault absolute path for the new file, with extension.
         * @param data - Text content for the new file.
         * @param options - Write options.
         * @returns The promise that resolves to the new file.
         * @example
         * ```ts
         * await vault.create('foo.md', 'bar');
         * ```
         * @official
         * @since 0.9.7
         */
        create(path: string, data: string, options?: DataWriteOptions): Promise<TFile>;

        /**
         * Create a new binary file inside the vault.
         *
         * @param path - Vault absolute path for the new file, with extension.
         * @param data - Content for the new file.
         * @param options - Write options.
         * @returns The promise that resolves to the new file.
         * @throws Error if file already exists.
         * @example
         * ```ts
         * await vault.createBinary('foo.png', new Uint8Array([1, 2, 3]).buffer);
         * ```
         * @official
         * @since 0.9.7
         */
        createBinary(path: string, data: ArrayBuffer, options?: DataWriteOptions): Promise<TFile>;

        /**
         * Create a new folder inside the vault.
         *
         * @param path - Vault absolute path for the new folder.
         * @throws Error if folder already exists.
         * @returns The promise that resolves to the new folder.
         * @example
         * ```ts
         * await vault.createFolder('foo');
         * ```
         * @official
         * @since 1.4.0
         */
        createFolder(path: string): Promise<TFolder>;

        /**
         * Deletes the file completely.
         *
         * @param file - The file or folder to be deleted.
         * @param force - Should attempt to delete folder even if it has hidden children.
         * @returns The promise that resolves when the file is deleted.
         * @official
         * @since 0.9.7
         */
        delete(file: TAbstractFile, force?: boolean): Promise<void>;

        /**
         * Remove a vault config file
         *
         * @unofficial
         */
        deleteConfigJson(configFile: string): Promise<void>;

        /**
         * Check whether a path exists in the vault.
         *
         * @unofficial
         */
        exists(path: string, isCaseSensitive?: boolean): Promise<boolean>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        generateFiles(e: AsyncGenerator<TFile>, t: boolean): Promise<void>;

        /**
         * Get a file or folder inside the vault at the given path. To check if the return type is.
         * a file, use `instanceof TFile`. To check if it is a folder, use `instanceof TFolder`.
         *
         * @param path - vault absolute path to the folder or file, with extension, case sensitive.
         * @returns the abstract file, if it's found.
         * @example
         * ```ts
         * console.log(vault.getAbstractFileByPath('existent-file.md')); // TFile
         * console.log(vault.getAbstractFileByPath('existent-folder')); // TFolder
         * console.log(vault.getAbstractFileByPath('non-existent-file.md')); // null
         * console.log(vault.getAbstractFileByPath('non-existent-folder')); // null
         * ```
         * @official
         * @since 0.11.11
         */
        getAbstractFileByPath(path: string): TAbstractFile | null;

        /**
         * Get an abstract file by path, insensitive to case.
         *
         * @unofficial
         */
        getAbstractFileByPathInsensitive(path: string): TAbstractFile | null;

        /**
         * Get all folders in the vault.
         *
         * @param includeRoot - Should the root folder (`/`) be returned.
         * @returns All folders in the vault.
         * @official
         * @since 1.6.6
         */
        getAllFolders(includeRoot?: boolean): TFolder[];

        /**
         * Get all files and folders in the vault.
         *
         * @returns All files and folders in the vault.
         * @official
         * @since 0.9.7
         */
        getAllLoadedFiles(): TAbstractFile[];

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
         * Get a file inside the vault at the given path.
         *
         * @param path - The path to the file.
         * @returns The file or `null` if it does not exist.
         * @example
         * ```ts
         * console.log(vault.getFileByPath('existent-file.md')); // TFile
         * console.log(vault.getFileByPath('non-existent-file.md')); // null
         * ```
         * @official
         * @since 1.5.7
         */
        getFileByPath(path: string): TFile | null;

        /**
         * Get all files in the vault.
         *
         * @returns All files in the vault.
         * @official
         * @since 0.9.7
         */
        getFiles(): TFile[];

        /**
         * Get a folder inside the vault at the given path.
         *
         * @param path - The path to the folder.
         * @returns The folder or `null` if it does not exist.
         * @example
         * ```ts
         * console.log(vault.getFolderByPath('existent-folder')); // TFolder
         * console.log(vault.getFolderByPath('non-existent-folder')); // null
         * ```
         * @official
         * @since 1.5.7
         */
        getFolderByPath(path: string): TFolder | null;

        /**
         * Get all Markdown files in the vault.
         *
         * @returns All Markdown files in the vault.
         * @official
         * @since 0.9.7
         */
        getMarkdownFiles(): TFile[];

        /**
         * Gets the name of the vault.
         *
         * @official
         * @since 0.9.7
         */
        getName(): string;

        /**
         * Returns a URI for the browser engine to use, for example to embed an image.
         *
         * @param file - The file to get the resource path for.
         * @returns The resource path for the file.
         * @official
         * @since 0.9.7
         */
        getResourcePath(file: TFile): string;

        /**
         * Get the root folder of the current vault.
         *
         * @returns The root folder of the current vault.
         * @official
         * @since 0.9.7
         */
        getRoot(): TFolder;

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
         * Modify the contents of a plaintext file.
         *
         * @param file - The file.
         * @param data - The new file content.
         * @param options - Write options.
         * @returns The promise that resolves when the file is modified.
         * @official
         * @since 0.9.7
         */
        modify(file: TFile, data: string, options?: DataWriteOptions): Promise<void>;

        /**
         * Modify the contents of a binary file.
         *
         * @param file - The file.
         * @param data - The new file content.
         * @param options - Write options.
         * @returns The promise that resolves when the file is modified.
         * @official
         * @since 0.9.7
         */
        modifyBinary(file: TFile, data: ArrayBuffer, options?: DataWriteOptions): Promise<void>;

        /**
         * Called whenever any of Obsidian's settings are changed.
         *
         * @remark Does *not* trigger when a particular plugin's settings are changed, for that, you could monkey-patch the `saveSettings` method of a plugin instance.
         * @unofficial
         * @since 0.9.7
         */
        on(name: 'config-changed', callback: (configKey: string) => void, ctx?: unknown): EventRef;

        /**
         * Called when a file is created.
         * This is also called when the vault is first loaded for each existing file
         * If you do not wish to receive create events on vault load, register your event handler inside {@link Workspace.onLayoutReady}.
         *
         * @param name - Should be `'create'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.vault.on('create', (file) => {
         *     console.log(file);
         * });
         * ```
         * @official
         */
        on(name: 'create', callback: (file: TAbstractFile) => any, ctx?: any): EventRef;

        /**
         * Called when a file is deleted.
         *
         * @param name - Should be `'delete'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.vault.on('delete', (file) => {
         *     console.log(file);
         * });
         * ```
         * @official
         */
        on(name: 'delete', callback: (file: TAbstractFile) => any, ctx?: any): EventRef;

        /**
         * Called when a file is modified.
         *
         * @param name - Should be `'modify'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.vault.on('modify', (file) => {
         *     console.log(file);
         * });
         * ```
         * @official
         */
        on(name: 'modify', callback: (file: TAbstractFile) => any, ctx?: any): EventRef;

        /**
         * Triggered whenever a file gets loaded internally
         *
         * @unofficial
         */
        on(name: 'raw', callback: (path: string) => void, ctx?: unknown): EventRef;

        /**
         * Called when a file is renamed.
         *
         * @param name - Should be `'rename'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.vault.on('rename', (file, oldPath) => {
         *     console.log(file, oldPath);
         * });
         * ```
         * @official
         */
        on(name: 'rename', callback: (file: TAbstractFile, oldPath: string) => any, ctx?: any): EventRef;

        /**
         * Atomically read, modify, and save the contents of a note.
         *
         * @param file - The file to be read and modified.
         * @param fn - A callback function which returns the new content of the note synchronously.
         * @param options - Write options.
         * @returns The promise that resolves to the text value of the note that was written.
         * @example
         * ```ts
         * await app.vault.process(file, (data) => {
         *     return data.replace('foo', 'bar');
         * });
         * ```
         * @official
         * @since 1.1.0
         */
        process(file: TFile, fn: (data: string) => string, options?: DataWriteOptions): Promise<string>;

        /**
         * Read a plaintext file that is stored inside the vault, directly from disk.
         * Use this if you intend to modify the file content afterwards.
         * Use {@link Vault.cachedRead} otherwise for better performance.
         *
         * @param file - The file to read.
         * @returns The promise that resolves to the file content.
         * @official
         * @since 0.9.7
         */
        read(file: TFile): Promise<string>;

        /**
         * Read the content of a binary file stored inside the vault.
         *
         * @param file - The file to read.
         * @returns The promise that resolves to the binary file content.
         * @official
         * @since 0.9.7
         */
        readBinary(file: TFile): Promise<ArrayBuffer>;

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
         * Rename or move a file. To ensure links are automatically renamed,.
         * use {@link FileManager.renameFile} instead.
         *
         * @param file - The file to rename/move.
         * @param newPath - Vault absolute path to move file to.
         * @returns The promise that resolves when the file is renamed.
         * @official
         * @since 0.9.11
         */
        rename(file: TAbstractFile, newPath: string): Promise<void>;

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
         * Tries to move to system trash. If that isn't successful/allowed, use local trash.
         *
         * @param file - The file or folder to be trashed.
         * @param system - Set to `false` to use local trash by default.
         * @returns The promise that resolves when the file is trashed.
         * @official
         * @since 0.9.7
         */
        trash(file: TAbstractFile, system: boolean): Promise<void>;

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

    namespace Vault {
        /**
         * Recursively iterate over all files and folders in the vault.
         *
         * @param root - The root folder to iterate over.
         * @param cb - A callback function that will be called for each file and folder.
         *
         * @example
         * ```ts
         * Vault.recurseChildren(vault.getRoot(), (file) => {
         *     console.log(file);
         * });
         * ```
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link recurseChildren} instead.
         * @since 0.9.7
         */
        function recurseChildren__(root: TFolder, cb: (file: TAbstractFile) => any): void;
    }
}
