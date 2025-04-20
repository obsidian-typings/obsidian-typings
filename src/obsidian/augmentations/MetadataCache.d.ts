import type { CustomArrayDict } from '../internals/Collections/CustomArrayDict.d.ts';
import type { ItemQueue } from '../internals/Collections/ItemQueue.d.ts';
import type { FileCacheEntry } from '../internals/FileCacheEntry.d.ts';
import type { LinkSuggestion } from '../internals/LinkSuggestion.d.ts';
import type { MetadataCacheFileCacheRecord } from '../internals/MetadataCacheRecords/MetadataCacheFileCacheRecord.d.ts';
import type {
    MetadataCacheMetadataCacheRecord
} from '../internals/MetadataCacheRecords/MetadataCacheMetadataCacheRecord.d.ts';
import type { MetadataCacheWorkerMessage } from '../internals/MetadataCacheWorkerMessage.d.ts';
import type { PromisedQueue } from '../internals/PromisedQueue.d.ts';
import type { PropertyInfo } from '../internals/PropertyInfo.d.ts';

export {};

declare module 'obsidian' {
    interface MetadataCache extends Events {
        /**
         * Called by preload() which is in turn called by initialize()
         *
         * @unofficial
         */
        _preload: () => Promise<void>;

        /**
         * Reference to App.
         *
         * @unofficial
         */
        app: App;

        /**
         * @todo Documentation incomplete.
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
         * @todo Documentation incomplete.
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
         * @todo Documentation incomplete.
         * @unofficial
         */
        linkResolverQueue: ItemQueue<TFile | null> | null;

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        preload: () => Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        preloadPromise: Promise<void> | null;

        /**
         * Mapping of filename to collection of files that share the same name
         *
         * @unofficial
         */
        uniqueFileLookup: CustomArrayDict<TFile>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        userIgnoreFilterCache: Record<string, boolean>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        userIgnoreFilters: RegExp[] | null;

        /**
         * @todo Documentation incomplete.
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
         * @todo Documentation incomplete.
         * @unofficial
         */
        worker: Worker;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        workerResolve: ((value: CachedMetadata | PromiseLike<CachedMetadata>) => void) | null;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        workQueue: PromisedQueue;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        _getLinkpathDest(origin: string, path: string): TFile[];

        /**
         * Clear all caches to null values
         *
         * @unofficial
         */
        cleanupDeletedCache(): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        clear(): Promise<void>;

        /**
         * Called by initialize()
         *
         * @unofficial
         */
        computeFileMetadataAsync(file: TFile): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        computeMetadataAsync(arrayBuffer: ArrayBuffer): Promise<CachedMetadata | undefined>;

        /**
         * Remove all entries that contain deleted path
         *
         * @unofficial
         */
        deletePath(path: string): void;

        /**
         * Get all property infos of the vault.
         *
         * @unofficial
         */
        getAllPropertyInfos(): Record<string, PropertyInfo>;

        /**
         * Get all backlink information for a file.
         *
         * @unofficial
         */
        getBacklinksForFile(file: TFile): CustomArrayDict<Reference>;

        /**
         * Get paths of all files cached in the vault.
         *
         * @unofficial
         */
        getCachedFiles(): string[];

        /**
         * Get an entry from the file cache.
         *
         * @unofficial
         */
        getFileInfo(path: string): FileCacheEntry | undefined;

        /**
         * Get property values for frontmatter property key.
         *
         * @unofficial
         */
        getFrontmatterPropertyValuesForKey(key: string): string[];

        /**
         * Get destination of link path.
         *
         * @unofficial
         */
        getLinkpathDest(origin: string, path: string): TFile[];

        /**
         * Get all links within the vault per file.
         *
         * @unofficial
         */
        getLinks(): Record<string, Reference[]>;

        /**
         * Get all links (resolved or unresolved) in the vault.
         *
         * If the note has multiple aliases, it will be returned multiple times for each alias.
         *
         * @unofficial
         */
        getLinkSuggestions(): LinkSuggestion[];

        /**
         * Get all tags within the vault and their usage count.
         *
         * @unofficial
         */
        getTags(): Record<string, number>;

        /**
         * Initialize Database connection and load up caches
         *
         * @unofficial
         */
        initialize(): Promise<void>;

        /**
         * Check whether there are no cache tasks in progress
         *
         * @unofficial
         */
        isCacheClean(): boolean;

        /**
         * Check whether file can support metadata (by checking extension support)
         *
         * @unofficial
         */
        isSupportedFile(file: TFile): boolean;

        /**
         * Check whether string is part of the user ignore filters
         *
         * @unofficial
         */
        isUserIgnored(path: string): boolean;

        /**
             * Iterate over all link references in the vault with callback.
             *
            @unofficial
             */
        iterateReferences(callback: (path: string) => void): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        linkResolver(): void;

        /**
         * Called whenever the metadatacache has finished updating.
         *
         * @unofficial
         */
        on(name: 'finished', callback: () => void): EventRef;

        /**
         * Called whenever the metadatacache is fully loaded in.
         *
         * @remark 'finished' is also emitted when the cache is initialized.
         * @unofficial
         */
        on(name: 'initialized', callback: () => void): EventRef;

        /**
         * Execute onCleanCache callbacks if cache is clean
         *
         * @unofficial
         * @unofficial
         */
        onCleanCache(onCleanCacheCallback: () => void): void;

        /**
         * On creation of the cache: update metadata cache
         *
         * @unofficial
         */
        onCreate(file: TAbstractFile): void;

        /**
         * On creation or modification of the cache: update metadata cache
         *
         * @unofficial
         */
        onCreateOrModify(file: TAbstractFile): void;

        /**
         * On deletion of the cache: update metadata cache
         *
         * @unofficial
         */
        onDelete(file: TAbstractFile): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onReceiveMessageFromWorker(message: MetadataCacheWorkerMessage): void;

        /**
         * On rename of the cache: update metadata cache
         *
         * @unofficial
         */
        onRename(file: TAbstractFile, oldPath: string): void;

        /**
         * Check editor for unresolved links and mark these as unresolved
         *
         * @unofficial
         */
        resolveLinks(path: string): void;

        /**
         * Update file cache entry and sync to indexedDB
         *
         * @unofficial
         */
        saveFileCache(path: string, entry: FileCacheEntry): void;

        /**
         * Update metadata cache entry and sync to indexedDB
         *
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
         * @unofficial
         */
        work(arrayBuffer: ArrayBuffer): Promise<CachedMetadata>;
    }
}
