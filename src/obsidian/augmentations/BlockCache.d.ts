export {};

declare module 'obsidian' {
  /**
   * The cache of the block in the note.
   *
   * ```markdown
   * foo ^bar
   * ```
   *
   * @since 0.11.13
   */
  interface BlockCache extends CacheItem {
    /**
     * Reference to the {@link obsidian#App}.
     *
     * @unofficial
     */
    app: App;

    /**
     * Internal cache data for block references.
     *
     * @unofficial
     */
    cache: unknown;

    /**
     * The ID of the block.
     *
     * @example
     * ```ts
     * console.log(blockCache.id); // bar
     * ```
     * @official
     */
    id: string;

    /**
     * Clears the block cache.
     *
     * @unofficial
     */
    clear(): void;

    /**
     * Iterates the block cache for every markdown file in the vault.
     *
     * @param cancelContext - A cancellation context exposing `isCancelled()`.
     * @returns An async generator over the per-file block caches.
     * @unofficial
     */
    getAll(cancelContext: unknown): AsyncGenerator<unknown>;

    /**
     * Gets the block cache for a file, reading and caching it if needed.
     *
     * @param cancelContext - A cancellation context exposing `isCancelled()`.
     * @param file - The file whose block cache to get.
     * @returns A promise resolving to the file's block cache, or `null`.
     * @unofficial
     */
    getForFile(cancelContext: unknown, file: TFile): Promise<unknown>;
  }
}
