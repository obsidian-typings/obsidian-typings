import type { FileCacheEntry } from '../FileCacheEntry.d.ts';

/**
 * Record mapping file paths to their file cache entries (hash, mtime, size).
 *
 * @public
 * @unofficial
 */
export interface MetadataCacheFileCacheRecord extends Record<string, FileCacheEntry> {}
