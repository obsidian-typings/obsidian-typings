import type { CustomArrayDict } from '../internals/collections/CustomArrayDict.d.ts';
import type { ItemQueue } from '../internals/collections/ItemQueue.d.ts';
import type { FileCacheEntry } from '../internals/FileCacheEntry.d.ts';
import type { LinkSuggestion } from '../internals/LinkSuggestion.d.ts';
import type { LinkUpdaters } from '../internals/link-update/LinkUpdaters.d.ts';
import type { MetadataCacheFileCacheRecord } from '../internals/metadata-cache-records/MetadataCacheFileCacheRecord.d.ts';
import type {
    MetadataCacheMetadataCacheRecord
} from '../internals/metadata-cache-records/MetadataCacheMetadataCacheRecord.d.ts';
import type { MetadataCacheWorkerMessage } from '../internals/MetadataCacheWorkerMessage.d.ts';
import type { PromisedQueue } from '../internals/PromisedQueue.d.ts';
import type { PropertyInfo } from '../internals/PropertyInfo.d.ts';

export {};

declare module 'obsidian' {
    /**
     * A cached metadata for a note.
     *
     * Linktext is any internal link that is composed of a path and a subpath, such as 'My note#Heading'
     * Linkpath (or path) is the path part of a linktext
     * Subpath is the heading/block ID part of a linktext.
     */
    interface MetadataCache extends Events {
        /**
         * Reference to App.
         *
         * @unofficial
         */
        app: App;

        /**
         * Cache for block references in the vault.
         * @unofficial
         */
        blockCache: BlockCache;

        /**
         * IndexedDB database
         *
         * @unofficial
         */
        db: IDBDatabase;

        /**
         * Debounced callback that fires when the metadata cache finishes processing.
         * @unofficial
         */
        didFinish: Debouncer<[], void>;

        /**
         * File contents cache
         *
         * @unofficial
         */
        fileCache: MetadataCacheFileCacheRecord;

        /**
         * Whether the cache is fully loaded
         *
         * @unofficial
         */
        initialized: boolean;

        /**
         * Amount of tasks currently in progress
         *
         * @unofficial
         */
        inProgressTaskCount: number;

        /**
         * Queue of files pending link resolution.
         * @unofficial
         */
        linkResolverQueue: ItemQueue<TFile | null> | null;

        /**
         * Registered link updater strategies for different file types.
         * @unofficial
         */
        linkUpdaters: LinkUpdaters;

        /**
         * File hash to metadata cache entry mapping
         *
         * @unofficial
         */
        metadataCache: MetadataCacheMetadataCacheRecord;

        /**
         * Callbacks to execute on cache clean
         *
         * @unofficial
         */
        onCleanCacheCallbacks: (() => void)[];

        /**
         * Promise that resolves when the preload is complete, or `null` if not started.
         * @unofficial
         */
        preloadPromise: Promise<void> | null;

        /**
         * Contains all resolved links. This object maps each source file's path to an object of destination file paths with the link count.
         * Source and destination paths are all vault absolute paths that comes from `TFile.path` and can be used with `Vault.getAbstractFileByPath(path)`.
         *
         * @official
         */
        resolvedLinks: Record<string, Record<string, number>>;

        /**
         * Debounced function for saving caches to the database.
         * @unofficial
         */
        transactionSave: Debouncer<[], void>;

        /**
         * Mapping of filename to collection of files that share the same name
         *
         * @unofficial
         */
        uniqueFileLookup: CustomArrayDict<TFile>;

        /**
         * Contains all unresolved links. This object maps each source file to an object of unknown destinations with count.
         * Source paths are all vault absolute paths, similar to {@link resolvedLinks}.
         *
         * @official
         */
        unresolvedLinks: Record<string, Record<string, number>>;

        /**
         * Cache of paths checked against user ignore filters.
         * @unofficial
         */
        userIgnoreFilterCache: Record<string, boolean>;

        /**
         * Compiled regular expressions for user-defined ignore filters.
         * @unofficial
         */
        userIgnoreFilters: RegExp[] | null;

        /**
         * Raw string representation of user-defined ignore filters.
         * @unofficial
         */
        userIgnoreFiltersString: string;

        /**
         * Reference to Vault.
         *
         * @unofficial
         */
        vault: Vault;

        /**
         * Web Worker used for parsing metadata in the background.
         * @unofficial
         */
        worker: Worker;

        /**
         * Resolve function for the current worker promise, or `null` if idle.
         * @unofficial
         */
        workerResolve: ((value: CachedMetadata | PromiseLike<CachedMetadata>) => void) | null;

        /**
         * Queue for processing metadata computation tasks sequentially.
         * @unofficial
         */
        workQueue: PromisedQueue;

        /**
         * Execute onCleanCache callbacks if cache is clean.
         *
         * @unofficial
         */
        checkCleanCache(): void;

        /**
         * Clear all caches to `null` values
         *
         * @unofficial
         */
        cleanupDeletedCache(): void;

        /**
         * Clear all metadata caches and reset state.
         *
         * @returns A promise that resolves when all caches are cleared.
         * To get the constructor, use `getMetadataCacheConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         */
        clear(): Promise<void>;

        /**
         * Called by initialize()
         *
         * @param file - The file to compute metadata for.
         * @returns A promise that resolves when the metadata is computed.
         * @unofficial
         */
        computeFileMetadataAsync(file: TFile): Promise<void>;

        /**
         * Compute metadata from raw file content asynchronously.
         *
         * @param arrayBuffer - The raw file content.
         * @returns A promise that resolves to the computed metadata, or `undefined`.
         * @unofficial
         */
        computeMetadataAsync(arrayBuffer: ArrayBuffer): Promise<CachedMetadata | undefined>;

        /**
         * Constructor.
         *
         * @param app - The app.
         * @param vault - The vault.
         * @returns The new instance.
         * @unofficial
         */
        constructor__(app: App, vault: Vault): this;

        /**
         * Remove all entries that contain deleted path
         *
         * @param path - The path to remove entries for.
         * @unofficial
         */
        deletePath(path: string): void;

        /**
         * Generates a linktext for a file.
         *
         * If file name is unique, use the filename.
         * If not unique, use full path.
         *
         * @param file - The file to generate a linktext for.
         * @param sourcePath - The source path to generate a linktext for.
         * @param omitMdExtension - Whether to omit the `.md` extension from the linktext.
         * @returns The linktext for the file.
         * @example
         * ```ts
         * const file = app.vault.getFileByPath('foo/bar.md');
         * console.log(app.metadataCache.fileToLinktext(file, 'baz/qux.md')); // 'bar' or 'foo/bar' depending on whether the file name is unique
         * ```
         * @official
         */
        fileToLinktext(file: TFile, sourcePath: string, omitMdExtension?: boolean): string;

        /**
         * Get all property infos of the vault.
         *
         * @returns A record of property name to property info.
         * @unofficial
         */
        getAllPropertyInfos(): Record<string, PropertyInfo>;

        /**
         * Get all backlink information for a file.
         *
         * @param file - The file to get backlinks for.
         * @returns The backlinks for the file.
         * @unofficial
         */
        getBacklinksForFile(file: TFile): CustomArrayDict<Reference>;

        /**
         * Get the cached metadata for a path.
         *
         * @param path - The path to get the cached metadata for.
         * @returns The cached metadata for the path or `null` if the metadata for the path is not cached.
         * @example
         * ```ts
         * const cache = app.metadataCache.getCache('foo/bar.md');
         * ```
         * @official
         * @since 0.14.5
         */
        getCache(path: string): CachedMetadata | null;

        /**
         * Get paths of all files cached in the vault.
         *
         * @returns The paths of all cached files.
         * @unofficial
         */
        getCachedFiles(): string[];

        /**
         * Get the cached metadata for a file.
         *
         * @param file - The file to get the cached metadata for.
         * @returns The cached metadata for the file or `null` if the metadata for the file is not cached.
         * @example
         * ```ts
         * const file = app.vault.getFileByPath('foo/bar.md');
         * const cache = app.metadataCache.getFileCache(file);
         * ```
         * @official
         * @since 0.9.21
         */
        getFileCache(file: TFile): CachedMetadata | null;

        /**
         * Get an entry from the file cache.
         *
         * @param path - The path to get the file info for.
         * @returns The file cache entry or `undefined`.
         * @unofficial
         */
        getFileInfo(path: string): FileCacheEntry | undefined;

        /**
         * Get the best match for a linkpath.
         *
         * @param linkpath - The linkpath to get the best match for.
         * @param sourcePath - The source path to get the best match for.
         * @returns The best match for the linkpath or `null` if the linkpath is not found.
         * @example
         * ```ts
         * console.log(app.metadataCache.getFirstLinkpathDest('foo/bar', 'baz/qux.md'); // TFile with path: 'baz/foo/bar.md' or 'some/other/path/foo/bar.md'
         * ```
         * @official
         * @since 0.12.5
         */
        getFirstLinkpathDest(linkpath: string, sourcePath: string): TFile | null;

        /**
         * Get property values for frontmatter property key.
         *
         * @param key - The frontmatter property key.
         * @returns The property values for the key.
         * @unofficial
         */
        getFrontmatterPropertyValuesForKey(key: string): string[];

        /**
         * Get destination of link path.
         *
         * @param origin - The origin path.
         * @param path - The link path.
         * @returns The matching destination files.
         * @unofficial
         */
        getLinkpathDest(origin: string, path: string): TFile[];

        /**
         * Get all links within the vault per file.
         *
         * @returns A record of file path to references.
         * @unofficial
         */
        getLinks(): Record<string, Reference[]>;

        /**
         * Get all links (resolved or unresolved) in the vault.
         *
         * If the note has multiple aliases, it will be returned multiple times for each alias.
         *
         * @returns The link suggestions.
         * @unofficial
         */
        getLinkSuggestions(): LinkSuggestion[];

        /**
         * Get all tags within the vault and their usage count.
         *
         * @returns A record of tag to usage count.
         * @unofficial
         */
        getTags(): Record<string, number>;

        /**
         * Initialize Database connection and load up caches
         *
         * @returns A promise that resolves when initialization is complete.
         * @unofficial
         */
        initialize(): Promise<void>;

        /**
         * Check whether there are no cache tasks in progress
         *
         * @returns Whether the cache is clean.
         * @unofficial
         */
        isCacheClean(): boolean;

        /**
         * Check whether file can support metadata (by checking extension support)
         *
         * @param file - The file to check.
         * @returns Whether the file is supported.
         * @unofficial
         */
        isSupportedFile(file: TFile): boolean;

        /**
         * Check whether a link is unresolved.
         *
         * @param linkpath - The link path to check.
         * @param sourcePath - The source path from which the link originates.
         * @returns Whether the link is unresolved.
         * @unofficial
         */
        isUnresolved(linkpath: string, sourcePath: string): boolean;

        /**
         * Check whether string is part of the user ignore filters
         *
         * @param path - The path to check.
         * @returns Whether the path is ignored.
         * @unofficial
         */
        isUserIgnored(path: string): boolean;

        /**
         * Iterate over all link references in the vault with callback.
         *
         * @param callback - The callback to execute for each reference path.
         * @unofficial
         */
        iterateAllRefs(callback: (path: string) => void): void;

        /**
         * Iterate over all references for a specific file.
         *
         * @param path - The file path to iterate references for.
         * @param callback - The callback to execute for each reference.
         * @unofficial
         */
        iterateRefsForFile(path: string, callback: (reference: ReferenceCache) => void): void;

        /**
         * Process the link resolver queue to resolve file links.
         * @unofficial
         */
        linkResolver(): void;

        /**
         * Called when a file has been indexed, and its (updated) cache is now available.
         *
         * @param name - Should be `'changed'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.metadataCache.on('changed', (file, data, cache) => {
         *     console.log(file, data, cache);
         * });
         * ```
         *
         * Note: This is not called when a file is renamed for performance reasons.
         * You must hook the {@link Vault.on | Vault.on(name: 'rename')} event for those.
         * @official
         */
        on(name: 'changed', callback: (file: TFile, data: string, cache: CachedMetadata) => unknown, ctx?: unknown): EventRef;

        /**
         * Called when a file has been deleted. A best-effort previous version of the cached metadata is presented,.
         * but it could be `null` in case the file was not successfully cached previously.
         *
         * @param name - Should be `'deleted'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.metadataCache.on('deleted', (file, prevCache) => {
         *     console.log(file, prevCache);
         * });
         * ```
         * @official
         */
        on(name: 'deleted', callback: (file: TFile, prevCache: CachedMetadata | null) => unknown, ctx?: unknown): EventRef;

        /**
         * Called whenever the metadatacache has finished updating.
         *
         * @returns The event reference.
         * @unofficial
         */
        on(name: 'finished', callback: () => void): EventRef;

        /**
         * Called whenever the metadatacache is fully loaded in.
         *
         * @remark 'finished' is also emitted when the cache is initialized.
         * @returns The event reference.
         * @unofficial
         */
        on(name: 'initialized', callback: () => void): EventRef;

        /**
         * Called when a file has been resolved for {@link resolvedLinks} and {@link unresolvedLinks | unresolvedLinks}.
         * This happens sometimes after a file has been indexed.
         *
         * @param name - Should be `'resolve'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.metadataCache.on('resolve', (file) => {
         *     console.log(file);
         * });
         * ```
         * @official
         */
        on(name: 'resolve', callback: (file: TFile) => unknown, ctx?: unknown): EventRef;

        /**
         * Called when all files has been resolved. This will be fired each time files get modified after the initial load.
         *
         * @param name - Should be `'resolved'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.metadataCache.on('resolved', () => {
         *     console.log('All files have been resolved');
         * });
         * ```
         * @official
         */
        on(name: 'resolved', callback: () => unknown, ctx?: unknown): EventRef;

        /**
         * Execute onCleanCache callbacks if cache is clean
         *
         * @param onCleanCacheCallback - The callback to execute when the cache is clean.
         * @unofficial
         * @unofficial
         */
        onCleanCache(onCleanCacheCallback: () => void): void;

        /**
         * Handle a configuration change event.
         *
         * @param configKey - The configuration key that changed.
         * @unofficial
         */
        onConfigChanged(configKey: string): void;

        /**
         * On creation of the cache: update metadata cache
         *
         * @param file - The created file.
         * @unofficial
         */
        onCreate(file: TAbstractFile): void;

        /**
         * On deletion of the cache: update metadata cache
         *
         * @param file - The deleted file.
         * @unofficial
         */
        onDelete(file: TAbstractFile): void;

        /**
         * Handle a message received from the metadata parsing worker.
         *
         * @param message - The worker message.
         * @unofficial
         */
        onReceiveMessageFromWorker(message: MetadataCacheWorkerMessage): void;

        /**
         * On rename of the cache: update metadata cache
         *
         * @param file - The renamed file.
         * @param oldPath - The previous path of the file.
         * @unofficial
         */
        onRename(file: TAbstractFile, oldPath: string): void;

        /**
         * Preload the metadata cache from the database.
         * @unofficial
         */
        preload: () => Promise<void>;

        /**
         * Queue a file for link resolution.
         *
         * @param file - The file to queue for link resolution, or `null`.
         * @unofficial
         */
        queueFileForLinkResolution(file: TFile | null): void;

        /**
         * Check editor for unresolved links and mark these as unresolved
         *
         * @param path - The file path to resolve links for.
         * @unofficial
         */
        resolveLinks(path: string): void;

        /**
         * Update file cache entry and sync to indexedDB
         *
         * @param path - The file path.
         * @param entry - The file cache entry to save.
         * @unofficial
         */
        saveFileCache(path: string, entry: FileCacheEntry): void;

        /**
         * Update metadata cache entry and sync to indexedDB
         *
         * @param hash - The file hash.
         * @param entry - The metadata cache entry to save.
         * @unofficial
         */
        saveMetaCache(hash: string, entry: CachedMetadata): void;

        /**
         * Show a notice that the cache is being rebuilt
         *
         * @unofficial
         */
        showIndexingNotice(): void;

        /**
         * Re-resolve all links for changed path
         *
         * @param path - The changed path.
         * @unofficial
         */
        updateRelatedLinks(path: string): void;

        /**
         * Update user ignore filters from settings
         *
         * @unofficial
         */
        updateUserIgnoreFilters(): void;

        /**
         * Bind actions to listeners on vault
         *
         * @unofficial
         */
        watchVaultChanges(): void;
    
        /**
         * Send message to worker to update metadata cache
         *
         * @param arrayBuffer - The raw file content to process.
         * @returns A promise that resolves to the computed metadata.
         * @unofficial
         */
        work(arrayBuffer: ArrayBuffer): Promise<CachedMetadata>;
}
}
