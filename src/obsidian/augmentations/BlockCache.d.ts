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
     * The ID of the block.
     *
     * @example
     * ```ts
     * console.log(blockCache.id); // bar
     * ```
     * @official
     */
    id: string;
  }
}
