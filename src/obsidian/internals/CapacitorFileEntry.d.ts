import type { FileStats } from 'obsidian';

/**
 * File or directory entry from the Capacitor (mobile) file system.
 *
 * @public
 * @unofficial
 */
export interface CapacitorFileEntry extends Partial<FileStats> {
  /** Name of the file or directory. */
  name: string;

  /** Whether this entry is a file or directory. */
  type: 'directory' | 'file';

  /** URI of the file or directory. */
  uri: string;
}
