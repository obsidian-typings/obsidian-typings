import type { CapacitorFilesystemChooseResult } from './CapacitorFilesystemChooseResult.d.ts';

/**
 * Obsidian's native `Filesystem` Capacitor plugin.
 *
 * Registered only on a native mobile platform, where it is reachable as `Capacitor.Plugins.Filesystem`.
 * Only the members verified against Obsidian's own calls are modelled.
 *
 * @public
 * @unofficial
 */
export interface CapacitorFilesystemPlugin {
  /**
   * Shows the native folder picker.
   *
   * Obsidian calls it with no arguments to choose a vault folder on Android. Cancelling rejects the
   * promise with an error whose message contains `canceled`.
   *
   * @returns The chosen folder.
   */
  choose(): Promise<CapacitorFilesystemChooseResult>;
}
