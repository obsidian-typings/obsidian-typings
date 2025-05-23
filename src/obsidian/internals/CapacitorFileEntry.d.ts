import type { FileStats } from 'obsidian';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface CapacitorFileEntry extends Partial<FileStats> {
    /** @todo Documentation incomplete. */
    name: string;

    /** @todo Documentation incomplete. */
    type: 'file' | 'directory';

    /** @todo Documentation incomplete. */
    uri: string;
}
