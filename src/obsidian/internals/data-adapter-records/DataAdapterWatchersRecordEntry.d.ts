import type { FSWatcher } from 'node:fs';

/**
 * Entry for a file system watcher registered by the data adapter.
 * @public
 * @unofficial
 */
export interface DataAdapterWatchersRecordEntry {
    /**
     * Resolved full path to the folder.
     */
    resolvedPath: string;

    /**
     * Node.js file system watcher.
     */
    watcher: FSWatcher;
}
