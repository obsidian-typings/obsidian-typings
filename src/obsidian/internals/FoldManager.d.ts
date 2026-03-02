import type { App } from 'obsidian';

/**
 * Manager for persisting and restoring editor fold states.
 * @public
 * @unofficial
 */
export interface FoldManager {
    /** Reference to the app. */
    app: App;

    /** Remove stale fold data from the cache. */
    cleanup(): unknown;

    /** Load fold state for the given file or view. */
    load(arg1: unknown): unknown;

    /** Load fold state from a specific path. */
    loadPath(arg1: unknown): unknown;

    /** Save fold state for the given file or view. */
    save(arg1: unknown, arg2: unknown): unknown;

    /** Save fold state to a specific path. */
    savePath(arg1: unknown, arg2: unknown): unknown;
}
