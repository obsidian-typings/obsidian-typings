import type { App } from 'obsidian';

/**
 * Manages saving, loading, and maintaining canvas local data on disk.
 * @public
 * @unofficial
 */
export interface CanvasDataManager {
    /** Reference to the Obsidian app instance. */
    app: App;

    /** Handle a file deletion event and remove associated canvas data. */
    handleDelete(arg1: unknown): unknown;

    /** Handle a file rename event and update associated canvas data paths. */
    handleRename(arg1: unknown, arg2: unknown): unknown;

    /** Load canvas data for the specified file. */
    load(arg1: unknown): unknown;

    /** Remove stored canvas data for the specified file. */
    remove(arg1: unknown): unknown;

    /** Save canvas data for the specified file. */
    save(arg1: unknown, arg2: unknown): unknown;
}
