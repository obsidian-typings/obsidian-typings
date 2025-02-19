import type { CachedMetadata } from 'obsidian';

/** @public */
export interface MetadataCacheWorkerMessage {
    data: CachedMetadata;
}
