import type { CachedMetadata } from 'obsidian';

/** @public @unofficial */
export interface MetadataCacheWorkerMessage {
    data: CachedMetadata;
}
