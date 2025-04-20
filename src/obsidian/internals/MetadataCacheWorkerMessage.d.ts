import type { CachedMetadata } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface MetadataCacheWorkerMessage {
    /**
     * @todo Documentation incomplete.
     */
    data: CachedMetadata;
}
