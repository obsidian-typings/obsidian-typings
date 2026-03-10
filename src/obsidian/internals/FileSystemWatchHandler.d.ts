import type { FileStats } from 'obsidian';

/**
 * Callback interface for handling file system watch events.
 * @public
 * @unofficial
 */
export interface FileSystemWatchHandler {
  /** Handle raw, folder-created, folder-removed, or file-removed events. */
  (eventType: 'file-removed' | 'folder-created' | 'folder-removed' | 'raw', path: string): void;

  /** Handle modified or file-created events with file stats. */
  (eventType: 'file-created' | 'modified', path: string, oldPath: undefined, stats: FileStats): void;

  /** Handle file rename events with old and new paths. */
  (eventType: 'renamed', path: string, oldPath: string): void;

  /** Handle watcher closed events. */
  (eventType: 'closed'): void;
}
