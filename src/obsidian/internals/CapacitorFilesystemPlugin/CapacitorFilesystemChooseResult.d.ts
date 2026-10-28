/**
 * Result of {@link CapacitorFilesystemPlugin.choose}.
 *
 * @public
 * @unofficial
 */
export interface CapacitorFilesystemChooseResult {
  /** Whether the chosen folder is the root folder of the device. */
  isRoot?: boolean;

  /** Path of the chosen folder. */
  path: string;
}
