import type { ReferenceCache } from 'obsidian';

/** @public */
export interface LinkChangeUpdate {
    change: string;
    reference: ReferenceCache;
    sourcePath: string;
}
