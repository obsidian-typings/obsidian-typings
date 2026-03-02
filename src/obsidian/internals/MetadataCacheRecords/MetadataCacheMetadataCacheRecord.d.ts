import type { CachedMetadata } from 'obsidian';

/**
 * Record mapping file paths to their parsed cached metadata.
 * @public
 * @unofficial
 */
export interface MetadataCacheMetadataCacheRecord extends Record<string, CachedMetadata> {}
