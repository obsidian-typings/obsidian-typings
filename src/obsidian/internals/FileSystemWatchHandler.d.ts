import type { FileStats } from 'obsidian';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface FileSystemWatchHandler {
    /** @todo Documentation incomplete. */
    (eventType: 'raw' | 'folder-created' | 'folder-removed' | 'file-removed', path: string): void;

    /** @todo Documentation incomplete. */
    (eventType: 'modified' | 'file-created', path: string, oldPath: undefined, stats: FileStats): void;

    /** @todo Documentation incomplete. */
    (eventType: 'renamed', path: string, oldPath: string): void;

    /** @todo Documentation incomplete. */
    (eventType: 'closed'): void;
}
