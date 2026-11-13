import type { SyncFilterFile } from './SyncFilterFile.d.ts';

/**
 * Selective-sync filter of Obsidian Sync, deciding which vault paths are synced.
 *
 * @public
 * @unofficial
 */
export interface SyncFilter {
  /** Configuration kinds that are synced: `app`, `appearance`, `appearance-data`, `hotkey`, `core-plugin`, `core-plugin-data`, `community-plugin` and `community-plugin-data`. Defaults to the first six. */
  allowSpecialFiles: Set<string>;

  /** Attachment kinds that are synced: `image`, `audio`, `pdf`, `video` and `unsupported` (all other types). Defaults to the first four. */
  allowTypes: Set<string>;

  /** The vault's configuration directory, `.obsidian` by default. */
  configDir: string;

  /** Memoized results of {@link SyncFilter.allowSyncFile}, keyed by path. */
  filterCache: Record<string, boolean>;

  /** Folders excluded from sync. */
  ignoreFolders: string[];

  /**
   * Check whether a path is synced, without the cache.
   *
   * @param path - The vault path.
   * @param isFolder - Whether the path is a folder.
   * @returns Whether the path is synced.
   */
  _allowSyncFile(path: string, isFolder: boolean): boolean;

  /**
   * Check whether a path is synced, memoized in {@link SyncFilter.filterCache}.
   *
   * @param path - The vault path.
   * @param isFolder - Whether the path is a folder.
   * @returns Whether the path is synced.
   */
  allowSyncFile(path: string, isFolder: boolean): boolean;

  /**
   * Apply a filter change and return the files it newly allows.
   *
   * @param files - The files to check, keyed by path.
   * @param change - The callback that changes the filter.
   * @returns The files that were excluded before the change and are allowed after it, shortest path first.
   */
  changeFilter<T extends SyncFilterFile>(files: Record<string, T>, change: (filter: SyncFilter) => void): T[];

  /** Reset the filter to its defaults. */
  clear(): void;

  /** Clear {@link SyncFilter.filterCache}. */
  clearCache(): void;

  /**
   * Find the first folder path that is synced.
   *
   * @param paths - The folder paths to check.
   * @returns The first synced path, or `undefined` when none is.
   */
  findUnreadable(paths: string[]): string | undefined;

  /**
   * Check whether a file name is one Sync carries for a community plugin.
   *
   * @param name - The file name; `manifest.json`, `main.js`, `styles.css` and `data.json` are plugin files.
   * @returns Whether the file is a plugin file.
   */
  isPluginFile(name: string): boolean;

  /**
   * Replace the filter settings and clear the cache.
   *
   * @param allowTypes - The attachment kinds to sync; the defaults when omitted.
   * @param allowSpecialFiles - The configuration kinds to sync; none when omitted.
   * @param ignoreFolders - The folders to exclude; none when omitted.
   */
  set(allowTypes?: Iterable<string> | null, allowSpecialFiles?: Iterable<string> | null, ignoreFolders?: null | string[]): void;
}
