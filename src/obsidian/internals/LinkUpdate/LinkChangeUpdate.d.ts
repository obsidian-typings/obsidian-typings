import type { ReferenceCache } from 'obsidian';

/** @public @unofficial */
export interface LinkChangeUpdate {
    change: string;
    reference: ReferenceCache;
    sourcePath: string;
}
