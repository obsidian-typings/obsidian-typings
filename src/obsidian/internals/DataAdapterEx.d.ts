import type { DataAdapter } from 'obsidian';

import type { DataAdapterFilesRecord } from './data-adapter-records/DataAdapterFilesRecord.d.ts';
import type { FileSystemWatchHandler } from './FileSystemWatchHandler.d.ts';
import type { PromisedQueue } from './PromisedQueue.d.ts';

/**
 * Common members for `CapacitorAdapter` and `FileSystemAdapter`.
 *
 * @public
 * @unofficial
 */
export interface DataAdapterEx extends DataAdapter, PromisedQueue {
  /**
   * Base OS path for the vault (e.g. `/home/user/vault`, or `C:\Users\user\documents\vault`).
   */
  basePath: string;

  /**
   * Mapping of file/folder path to vault entry, includes non-MD files.
   */
  files: DataAdapterFilesRecord;

  /**
   * Handles vault events.
   */
  handler: FileSystemWatchHandler | null;

  /**
   * Whether the file system is case-insensitive.
   */
  insensitive: boolean;

  /**
   * Triggers handler for vault events.
   */
  trigger: FileSystemWatchHandler;

  /**
   * Check if a file exists.
   *
   * @param fullPath - full path to the file.
   * @param sensitive - whether to check case-sensitive.
   * @returns A promise that resolves to `true` if the file exists, `false` otherwise.
   */
  _exists(fullPath: string, sensitive?: boolean): Promise<boolean>;

  /**
   * Get canonical full path of file.
   *
   * @param path - path to file.
   * @returns Full path to file.
   */
  getFullPath(path: string): string;

  /**
   * Get canonical full path of file.
   *
   * @param normalizedPath - normalized path to file.
   * @returns String full path to file.
   */
  getFullRealPath(normalizedPath: string): string;

  /**
   * Get normalized path.
   *
   * For vault-relative path, it's normalized vault-relative path.
   * For absolute path, it's path as is.
   *
   * @param path - path to file.
   * @returns Normalized path.
   */
  getRealPath(path: string): string;

  /**
   * Generates `this.files` for specific directory of the vault
   *
   * @param normalizedPath - The path to list recursively.
   * @returns A promise that resolves when the recursive listing is complete.
   */
  listRecursive(normalizedPath: string): Promise<void>;

  /**
   * Handle a file change event for the given path.
   *
   * @param normalizedPath - The path that changed.
   */
  onFileChange(normalizedPath: null | string): void;

  /**
   * Reconcile a deletion.
   *
   * @param normalizedPath - path to file.
   * @param normalizedNewPath - new path to file.
   * @param shouldSkipDeletionTimeout - whether the deletion timeout should be skipped (default: `true`).
   * @returns A promise that resolves when the file is reconciled.
   */
  reconcileDeletion(
    normalizedPath: string,
    normalizedNewPath: string,
    shouldSkipDeletionTimeout?: boolean
  ): Promise<void>;

  /**
   * Reconcile a file.
   *
   * @param normalizedPath - normalized path to file.
   * @param normalizedNewPath - normalized new path to file.
   * @param shouldSkipDeletionTimeout - whether the deletion timeout should be skipped - applies only to `reconcileDeletion`.
   * @returns A promise that resolves when the file is reconciled.
   */
  reconcileFile(
    normalizedPath: string,
    normalizedNewPath: string,
    shouldSkipDeletionTimeout?: boolean
  ): Promise<void>;

  /**
   * Reconcile a folder creation between old and new paths.
   *
   * @param normalizedPath - normalized original path.
   * @param normalizedNewPath - normalized new path.
   * @returns A promise that resolves when the folder creation is reconciled.
   */
  reconcileFolderCreation(normalizedPath: string, normalizedNewPath: string): Promise<void>;

  /**
   * Reconcile changes to an internal (config) file.
   *
   * @param normalizedPath - normalized path to the internal file.
   * @returns A promise that resolves when the internal file is reconciled.
   */
  reconcileInternalFile(normalizedPath: string): Promise<void>;

  /**
   * Reconcile a symbolic link creation between old and new paths.
   *
   * @param normalizedPath - The original path.
   * @param normalizedNewPath - normalized new path.
   * @returns A promise that resolves when the symbolic link creation is reconciled.
   */
  reconcileSymbolicLinkCreation(normalizedPath: string, normalizedNewPath: string): Promise<void>;

  /**
   * Remove file from files listing and trigger deletion event.
   *
   * @param normalizedPath - normalized path of the file to remove.
   */
  removeFile(normalizedPath: string): void;

  /**
   * Remove all listeners.
   */
  stopWatch(): void;

  /**
   * Set whether OS is insensitive to case.
   *
   * @param normalizedPath - normalized path to update.
   * @returns A promise that resolves when the update is complete.
   */
  update(normalizedPath: string): Promise<void>;

  /**
   * Add change watcher to path.
   *
   * @param handler - handler for file system changes.
   * @returns A promise that resolves when the watcher is registered.
   */
  watch(handler: FileSystemWatchHandler): Promise<void>;
}
