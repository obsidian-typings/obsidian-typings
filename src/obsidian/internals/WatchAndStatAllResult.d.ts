import type { CapacitorFileEntry } from './CapacitorFileEntry.d.ts';

/**
 * Result from watching and stating all files in a directory on Capacitor.
 *
 * @public
 * @unofficial
 */
export interface WatchAndStatAllResult {
  /** File entries found in the watched directory. */
  children: CapacitorFileEntry[];
}
