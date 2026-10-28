import type {
  FSWatcher,
  Stats
} from 'node:fs';
import type { TExternalFile } from 'obsidian';

import type { ExternalFileManager } from './ExternalFileManager.d.ts';

/**
 * Watches one external file without retaining the file object.
 *
 * @public
 * @unofficial
 */
export interface ExternalFileMonitor {
  /** The current file, or `null` after its weak reference expires. */
  readonly file: null | TExternalFile;

  /** Weak reference to the file. */
  fileref: WeakRef<TExternalFile>;

  /** Last observed inode, used to restart monitoring on non-Windows platforms. */
  inode: number;

  /** The owning manager. */
  manager: ExternalFileManager;

  /** Active filesystem watcher, or `null` when stopped. */
  watcher: FSWatcher | null;

  /** Physical path currently being watched, or an empty string when stopped. */
  watchpath: string;

  /**
   * Checks whether monitoring is active.
   *
   * @returns Whether a filesystem watcher is present.
   */
  isWatching(): boolean;

  /**
   * Refreshes file statistics, clears stale caches and emits modify or delete events.
   *
   * @returns A promise that resolves after the change is processed.
   */
  onFileChanged(): Promise<void>;

  /**
   * Starts monitoring if the file still exists and can be watched.
   *
   * @param stat - Previously read filesystem statistics, if available.
   */
  start(stat?: Stats): void;

  /** Stops monitoring and resets the watched path and inode. */
  stop(): void;
}
