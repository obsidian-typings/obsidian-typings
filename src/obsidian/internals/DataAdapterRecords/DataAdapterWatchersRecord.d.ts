import type { DataAdapterWatchersRecordEntry } from './DataAdapterWatchersRecordEntry.d.ts';

/**
 * A mapping between a vault-relative folder paths to the corresponding watcher entries.
 *
 * @public
 */
export interface DataAdapterWatchersRecord extends Record<string, DataAdapterWatchersRecordEntry> {}
