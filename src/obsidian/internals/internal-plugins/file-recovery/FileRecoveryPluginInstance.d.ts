import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { FileRecoveryPlugin } from './FileRecoveryPlugin.d.ts';

/**
 * Plugin instance for file recovery, managing file snapshots for restoration.
 * @public
 * @unofficial
 */
export interface FileRecoveryPluginInstance extends InternalPluginInstance<FileRecoveryPlugin> {
  /** Reference to the app. */
  app: App;

  /** Whether this plugin is enabled by default. */
  defaultOn: true;
}
