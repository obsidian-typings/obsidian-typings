import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SyncPlugin } from './SyncPlugin.d.ts';

/**
 * Plugin instance for Obsidian Sync, managing cloud synchronization of vault data.
 * @public
 * @unofficial
 */
export interface SyncPluginInstance extends InternalPluginInstance<SyncPlugin> {
  /** Reference to the app. */
  app: App;

  /** Reference to the sync plugin registration. */
  plugin: SyncPlugin;
}
