import type { CachedMetadata } from 'obsidian';

/**
 * Message received from the metadata cache web worker.
 * @public
 * @unofficial
 */
export interface MetadataCacheWorkerMessage {
    /** Parsed cached metadata returned by the worker. */
    data: CachedMetadata;
}
