/**
 * Memory usage statistics for a process.
 *
 * @public
 * @unofficial
 */
export interface ElectronMemoryInfo {
  /** The maximum amount of memory that has ever been pinned to actual physical RAM. */
  peakWorkingSetSize: number;

  /** The amount of memory not shared by other processes, such as JS heap or HTML content. Windows only. */
  privateBytes?: number;

  /** The amount of memory currently pinned to actual physical RAM. */
  workingSetSize: number;
}
