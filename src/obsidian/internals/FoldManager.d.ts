import type { App } from 'obsidian';

/**
 * Manager for persisting and restoring editor fold states.
 * @public
 * @unofficial
 */
export interface FoldManager {
    /** Reference to the app. */
    app: App;

    /**
     * Remove stale fold data from the cache.
     *
     * @returns The result of the cleanup operation.
     */
    cleanup(): unknown;

    /**
     * Load fold state for the given file or view.
     *
     * @returns The loaded fold state.
     */
    load(arg1: unknown): unknown;

    /**
     * Load fold state from a specific path.
     *
     * @returns The loaded fold state.
     */
    loadPath(arg1: unknown): unknown;

    /**
     * Save fold state for the given file or view.
     *
     * @returns The result of the save operation.
     */
    save(arg1: unknown, arg2: unknown): unknown;

    /**
     * Save fold state to a specific path.
     *
     * @returns The result of the save operation.
     */
    savePath(arg1: unknown, arg2: unknown): unknown;
}
