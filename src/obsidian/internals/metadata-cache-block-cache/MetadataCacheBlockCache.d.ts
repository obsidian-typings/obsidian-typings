import type {
  App,
  TFile
} from 'obsidian';

import type { Runnable } from '../Runnable.d.ts';
import type { MetadataCacheBlockCacheFileEntry } from './MetadataCacheBlockCacheFileEntry.d.ts';

/**
 * Per-file cache of the blocks a note offers as block-link suggestions, held at `MetadataCache.blockCache`.
 *
 * @remarks It is not a {@link obsidian#BlockCache}: it parses a note's whole text, and offers every top-level block
 * and list item as a suggestion, whether or not it carries a block ID.
 * @public
 * @unofficial
 */
export interface MetadataCacheBlockCache {
  /**
   * Reference to the {@link obsidian#App}.
   */
  app: App;

  /**
   * The cached entries, keyed by file path.
   */
  cache: Record<string, MetadataCacheBlockCacheFileEntry>;

  /**
   * Clears every cached entry.
   */
  clear(): void;

  /**
   * Gets the entry of every markdown file in the vault, one file at a time.
   *
   * @param runnable - The run the caller can cancel.
   * @returns An async generator over the entries; an entry is `null` when the run was cancelled while reading it.
   */
  getAll(runnable: Runnable): AsyncGenerator<MetadataCacheBlockCacheFileEntry | null>;

  /**
   * Gets the entry of a file, reading and parsing the file unless the cached entry is for the same file and modification time.
   *
   * @param runnable - The run the caller can cancel.
   * @param file - The file to get the entry of.
   * @returns A promise resolving to the entry, or `null` when the file is not markdown or the run was cancelled.
   */
  getForFile(runnable: Runnable, file: TFile): Promise<MetadataCacheBlockCacheFileEntry | null>;
}
