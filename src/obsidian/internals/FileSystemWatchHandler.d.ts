import type { FileStats } from 'obsidian';

/** @public @unofficial */
export interface FileSystemWatchHandler {
    (eventType: 'raw' | 'folder-created' | 'folder-removed' | 'file-removed', path: string): void;
    (eventType: 'modified' | 'file-created', path: string, oldPath: undefined, stats: FileStats): void;
    (eventType: 'renamed', path: string, oldPath: string): void;
    (eventType: 'closed'): void;
}
