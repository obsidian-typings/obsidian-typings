import type * as fs from 'node:fs';
import type * as path from 'node:path';
import type {
  TExternalFile,
  Vault
} from 'obsidian';

import type { ExternalFileMonitor } from './ExternalFileMonitor.d.ts';

/**
 * Resolves and monitors files outside the vault.
 *
 * @public
 * @unofficial
 */
export interface ExternalFileManager {
  /** Monitors keyed by normalized absolute filesystem paths. */
  files: Map<string, ExternalFileMonitor>;

  /** The desktop original-fs module. */
  fs: typeof fs;

  /** Periodic cleanup timer, or `null` when inactive. */
  interval: null | ReturnType<typeof setInterval>;

  /** The filesystem path module. */
  path: typeof path;

  /** The owning vault. */
  vault: Vault;

  /** Removes monitors whose weak file references have expired. */
  cleanup(): void;

  /**
   * Resolves an external path and creates a file and monitor when necessary.
   *
   * @param path - An external-file path, with or without the external-file prefix.
   * @returns The file, or `null` if the path is unsupported, missing or not a file.
   */
  getExternalFile(path: string): null | TExternalFile;

  /**
   * Looks up an existing file without creating a monitor.
   *
   * @param path - An external-file path, with or without the external-file prefix.
   * @returns The retained file, or `null` if none is loaded.
   */
  getLoadedFile(path: string): null | TExternalFile;

  /**
   * Renames a monitored external file and updates its monitor and vault path.
   *
   * @param file - The external file to rename.
   * @param path - The destination external-file path.
   * @returns A promise that resolves when the rename completes or the request is unsupported.
   */
  rename(file: TExternalFile, path: string): Promise<void>;
}
