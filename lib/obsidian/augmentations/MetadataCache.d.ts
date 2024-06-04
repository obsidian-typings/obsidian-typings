import type {
    CustomArrayDict,
    FileCacheEntry,
    PropertyInfo
} from "../types.js";

export {};

declare module "obsidian" {
    interface MetadataCache {
        /**
         * Reference to App
         */
        app: App;
        /** @internal */
        blockCache: BlockCache;
        /** @internal IndexedDB database */
        db: IDBDatabase;
        /** @internal File contents cache */
        fileCache: Record<string, FileCacheEntry>;
        /** @internal Whether the cache is fully loaded */
        initialized: boolean;
        /** @internal Amount of tasks currently in progress */
        inProgressTaskCount: number;
        /** @internal */
        linkResolverQueue: unknown;
        /** @internal File hash to metadata cache entry mapping */
        metadataCache: Record<string, CachedMetadata>;
        /** @internal Callbacks to execute on cache clean */
        onCleanCacheCallbacks: unknown[];
        /** @internal Mapping of filename to collection of files that share the same name */
        uniqueFileLookup: CustomArrayDict<TFile>;
        /** @internal */
        userIgnoreFilterCache: unknown;
        /** @internal */
        userIgnoreFilters: unknown;
        /** @internal */
        userIgnoreFiltersString: string;
        /**
         * Reference to Vault
         */
        vault: Vault;
        /** @internal */
        worker: Worker;
        /** @internal */
        workerResolve: unknown;
        /** @internal */
        workQueue: unknown;

        _getLinkpathDest(origin: string, path: string): TFile[];
        /** @internal Clear all caches to null values */
        cleanupDeletedCache(): void;
        /** @internal */
        clear(): unknown;
        /** @internal */
        computeMetadataAsync(e: unknown): Promise<unknown>;
        /** @internal Remove all entries that contain deleted path */
        deletePath(path: string): void;
        /**
         * Get all property infos of the vault
         */
        getAllPropertyInfos(): Record<string, PropertyInfo>;
        /**
         * Get all backlink information for a file
         */
        getBacklinksForFile(file?: TFile): CustomArrayDict<LinkCache>;
        /**
         * Get paths of all files cached in the vault
         */
        getCachedFiles(): string[];
        /**
         * Get an entry from the file cache
         */
        getFileInfo(path: string): FileCacheEntry | undefined;
        /**
         * Get property values for frontmatter property key
         */
        getFrontmatterPropertyValuesForKey(key: string): string[];
        /**
         * Get destination of link path
         */
        getLinkpathDest(origin: string, path: string): TFile[];
        /**
         * Get all links within the vault per file
         */
        getLinks(): Record<string, Reference[]>;
        /**
         * Get all links (resolved or unresolved) in the vault
         */
        getLinkSuggestions(): { file: TFile | null; path: string }[];
        /**
         * Get all tags within the vault and their usage count
         */
        getTags(): Record<string, number>;
        /** @internal Initialize Database connection and load up caches */
        initialize(): Promise<void>;
        /** @internal Check whether there are no cache tasks in progress */
        isCacheClean(): boolean;
        /** @internal Check whether file can support metadata (by checking extension support) */
        isSupportedFile(file: TFile): boolean;
        /** @internal Check whether string is part of the user ignore filters */
        isUserIgnored(filter: unknown): boolean;
        /**
         * Iterate over all link references in the vault with callback
         */
        iterateReferences(callback: (path: string) => void): void;
        /** @internal */
        linkResolver(): void;
        /**
         * Called whenever the metadatacache is fully loaded in
         *
         * @remark 'finished' is also emitted when the cache is initialized
         */
        on(name: "initialized", callback: () => void): EventRef;
        /**
         * Called whenever the metadatacache has finished updating
         */
        on(name: "finished", callback: () => void): EventRef;
        /** @internal Execute onCleanCache callbacks if cache is clean */
        onCleanCache(): void;
        /** @internal On creation of the cache: update metadata cache */
        onCreate(file: TFile): void;
        /** @internal On creation or modification of the cache: update metadata cache */
        onCreateOrModify(file: TFile): void;
        /** @internal On deletion of the cache: update metadata cache */
        onDelete(file: TFile): void;
        /** @internal */
        onReceiveMessageFromWorker(e: unknown): void;
        /** @internal On rename of the cache: update metadata cache */
        onRename(file: TFile, oldPath: string): void;
        /** @internal Check editor for unresolved links and mark these as unresolved */
        resolveLinks(editor: Element): void;
        /** @internal Update file cache entry and sync to indexedDB */
        saveFileCache(path: string, entry: FileCacheEntry): void;
        /** @internal Update metadata cache entry and sync to indexedDB */
        saveMetaCache(path: string, entry: CachedMetadata): void;
        /** @internal Show a notice that the cache is being rebuilt */
        showIndexingNotice(): void;
        /** @internal Re-resolve all links for changed path */
        updateRelatedLinks(path: string): void;
        /** @internal Update user ignore filters from settings */
        updateUserIgnoreFilters(): void;
        /** @internal Bind actions to listeners on vault */
        watchVaultChanges(): void;
        /** @internal Send message to worker to update metadata cache */
        work(cacheEntry: unknown): void;
    }
}
