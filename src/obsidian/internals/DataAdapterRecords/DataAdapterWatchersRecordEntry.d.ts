import type { FSWatcher } from 'node:fs';

/**
 * @todo Documentation incomplete
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
