import type { FileEntry } from '../FileEntry.d.ts';

/**
 * Record mapping file paths to their file entry metadata in the data adapter.
 *
 * @public
 * @unofficial
 */
export interface DataAdapterFilesRecord extends Record<string, FileEntry> {}
