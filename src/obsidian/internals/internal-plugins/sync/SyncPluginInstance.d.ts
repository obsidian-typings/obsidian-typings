import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SyncFilter } from './SyncFilter/SyncFilter.d.ts';
import type { SyncPlugin } from './SyncPlugin.d.ts';

/**
 * Plugin instance for Obsidian Sync, managing cloud synchronization of vault data.
 *
 * @public
 * @unofficial
 */
export interface SyncPluginInstance extends InternalPluginInstance<SyncPlugin> {
  /**
   * Reference to the app.
   */
  app: App;

  /** The selective-sync filter. */
  filter: SyncFilter;

  /**
   * Reference to the sync plugin registration.
   */
  plugin: SyncPlugin;

  /** The id of the connected remote vault, `null` when none is connected. */
  vaultId: null | string;

  /** The name of the connected remote vault, `null` when none is connected. */
  vaultName: null | string;

  /**
   * Apply a selective-sync filter change and queue the files it newly allows.
   *
   * @param change - The callback that changes the filter.
   */
  changeFilter(change: (filter: SyncFilter) => void): void;

  /**
   * Get the id of the connected remote vault.
   *
   * @returns The vault id, `null` when none is connected.
   */
  getRemoteVaultId(): null | string;

  /**
   * Get the name of the connected remote vault.
   *
   * @returns The vault name, `null` when none is connected.
   */
  getRemoteVaultName(): null | string;

  /**
   * Include or exclude a configuration kind from sync.
   *
   * @param type - The configuration kind, such as `app`, `hotkey` or `community-plugin`.
   * @param isEnabled - Whether to sync it.
   */
  setAllowSpecialFile(type: string, isEnabled: boolean): void;

  /**
   * Replace the folders excluded from sync.
   *
   * @param ignoreFolders - The folders to exclude.
   */
  setIgnoreFolders(ignoreFolders: string[]): void;

  /**
   * Rename the connected remote vault locally and save the sync data.
   *
   * @param name - The new vault name.
   * @returns A promise that resolves when the data is saved.
   */
  setRemoteVaultName(name: string): Promise<void>;

  /**
   * Include or exclude an attachment kind from sync.
   *
   * @param type - The attachment kind: `image`, `audio`, `pdf`, `video` or `unsupported`.
   * @param isEnabled - Whether to sync it.
   */
  setSyncType(type: string, isEnabled: boolean): void;
}
