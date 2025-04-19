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
        /** @internal Called by preload() which is in turn called by initialize() */
        _preload: () => Promise<void>;
        /**
         * Reference to App.
         */
        app: App;
        /** @internal */
        blockCache: BlockCache;
        /** @internal IndexedDB database */
        db: IDBDatabase;
        didFinish: Debouncer<[], void>;
        /** @internal File contents cache */
        fileCache: MetadataCacheFileCacheRecord;
        /** @internal Whether the cache is fully loaded */
        initialized: boolean;
        /** @internal Amount of tasks currently in progress */
        inProgressTaskCount: number;
        /** @internal */
        linkResolverQueue: ItemQueue<TFile | null> | null;
        /** @internal File hash to metadata cache entry mapping */
        metadataCache: MetadataCacheMetadataCacheRecord;
        /** @internal Callbacks to execute on cache clean */
        onCleanCacheCallbacks: (() => void)[];
        preload: () => Promise<void>;
        preloadPromise: Promise<void> | null;
        /** @internal Mapping of filename to collection of files that share the same name */
        uniqueFileLookup: CustomArrayDict<TFile>;
        /** @internal */
        userIgnoreFilterCache: Record<string, boolean>;
        /** @internal */
        userIgnoreFilters: RegExp[] | null;
        /** @internal */
        userIgnoreFiltersString: string;
        /**
         * Reference to Vault.
         */
        vault: Vault;
        /** @internal */
        worker: Worker;
        /** @internal */
        workerResolve: ((value: CachedMetadata | PromiseLike<CachedMetadata>) => void) | null;
        /** @internal */
        workQueue: PromisedQueue;

        _getLinkpathDest(origin: string, path: string): TFile[];
        /** @internal Clear all caches to null values */
        cleanupDeletedCache(): void;
        /** @internal */
        clear(): Promise<void>;
        /** @internal Called by initialize() */
        computeFileMetadataAsync(file: TFile): Promise<void>;
        /** @internal */
        computeMetadataAsync(arrayBuffer: ArrayBuffer): Promise<CachedMetadata | undefined>;
        /** @internal Remove all entries that contain deleted path */
        deletePath(path: string): void;
        /**
         * Get all property infos of the vault.
         */
        getAllPropertyInfos(): Record<string, PropertyInfo>;
        /**
         * Get all backlink information for a file.
         */
        getBacklinksForFile(file: TFile): CustomArrayDict<Reference>;
        /**
         * Get paths of all files cached in the vault.
         */
        getCachedFiles(): string[];
        /**
         * Get an entry from the file cache.
         */
        getFileInfo(path: string): FileCacheEntry | undefined;
        /**
         * Get property values for frontmatter property key.
         */
        getFrontmatterPropertyValuesForKey(key: string): string[];
        /**
         * Get destination of link path.
         */
        getLinkpathDest(origin: string, path: string): TFile[];
        /**
         * Get all links within the vault per file.
         */
        getLinks(): Record<string, Reference[]>;
        /**
         * Get all links (resolved or unresolved) in the vault.
         *
         * If the note has multiple aliases, it will be returned multiple times for each alias.
         */
        getLinkSuggestions(): LinkSuggestion[];
        /**
         * Get all tags within the vault and their usage count.
         */
        getTags(): Record<string, number>;
        /** @internal Initialize Database connection and load up caches */
        initialize(): Promise<void>;
        /** @internal Check whether there are no cache tasks in progress */
        isCacheClean(): boolean;
        /** @internal Check whether file can support metadata (by checking extension support) */
        isSupportedFile(file: TFile): boolean;
        /** @internal Check whether string is part of the user ignore filters */
        isUserIgnored(path: string): boolean;
        /**
         * Iterate over all link references in the vault with callback.
         */
        iterateReferences(callback: (path: string) => void): void;
        /** @internal */
        linkResolver(): void;
        /**
         * Called whenever the metadatacache has finished updating.
         */
        on(name: 'finished', callback: () => void): EventRef;
        /**
         * Called whenever the metadatacache is fully loaded in.
         *
         * @remark 'finished' is also emitted when the cache is initialized.
         */
        on(name: 'initialized', callback: () => void): EventRef;
        /** @internal Execute onCleanCache callbacks if cache is clean */
        onCleanCache(onCleanCacheCallback: () => void): void;
        /** @internal On creation of the cache: update metadata cache */
        onCreate(file: TAbstractFile): void;
        /** @internal On creation or modification of the cache: update metadata cache */
        onCreateOrModify(file: TAbstractFile): void;
        /** @internal On deletion of the cache: update metadata cache */
        onDelete(file: TAbstractFile): void;
        /** @internal */
        onReceiveMessageFromWorker(message: MetadataCacheWorkerMessage): void;
        /** @internal On rename of the cache: update metadata cache */
        onRename(file: TAbstractFile, oldPath: string): void;
        /** @internal Check editor for unresolved links and mark these as unresolved */
        resolveLinks(path: string): void;
        /** @internal Update file cache entry and sync to indexedDB */
        saveFileCache(path: string, entry: FileCacheEntry): void;
        /** @internal Update metadata cache entry and sync to indexedDB */
        saveMetaCache(hash: string, entry: CachedMetadata): void;
        /** @internal Show a notice that the cache is being rebuilt */
        showIndexingNotice(): void;
        /** @internal Re-resolve all links for changed path */
        updateRelatedLinks(path: string): void;
        /** @internal Update user ignore filters from settings */
        updateUserIgnoreFilters(): void;
        /** @internal Bind actions to listeners on vault */
        watchVaultChanges(): void;
        /** @internal Send message to worker to update metadata cache */
        work(arrayBuffer: ArrayBuffer): Promise<CachedMetadata>;
    }
}
