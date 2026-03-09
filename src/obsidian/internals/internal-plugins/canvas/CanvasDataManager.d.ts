import type { App } from 'obsidian';

/**
 * Manages saving, loading, and maintaining canvas local data on disk.
 * @public
 * @unofficial
 */
export interface CanvasDataManager {
  /** Reference to the Obsidian app instance. */
  app: App;

  /**
   * Handle a file deletion event and remove associated canvas data.
   *
   * @returns The result of handling the deletion.
   */
  handleDelete(arg1: unknown): unknown;

  /**
   * Handle a file rename event and update associated canvas data paths.
   *
   * @returns The result of handling the rename.
   */
  handleRename(arg1: unknown, arg2: unknown): unknown;

  /**
   * Load canvas data for the specified file.
   *
   * @returns The loaded canvas data.
   */
  load(arg1: unknown): unknown;

  /**
   * Remove stored canvas data for the specified file.
   *
   * @returns The result of removing the data.
   */
  remove(arg1: unknown): unknown;

  /**
   * Save canvas data for the specified file.
   *
   * @returns The result of saving the data.
   */
  save(arg1: unknown, arg2: unknown): unknown;
}
