import type { ReferenceCache } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface LinkChangeUpdate {
    /** @todo Documentation incomplete. */
    change: string;

    /** @todo Documentation incomplete. */
    reference: ReferenceCache;

    /** @todo Documentation incomplete. */
    sourcePath: string;
}
