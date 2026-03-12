import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { GlobalSearchPlugin } from './GlobalSearchPlugin.d.ts';

/**
 * Plugin instance for global search, providing vault-wide text search functionality.
 *
 * @public
 * @unofficial
 */
export interface GlobalSearchPluginInstance extends InternalPluginInstance<GlobalSearchPlugin> {
  /** Reference to the app. */
  app: App;

  /** Whether this plugin is enabled by default. */
  defaultOn: true;

  /** Reference to the global search plugin registration. */
  plugin: GlobalSearchPlugin;
}
