import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { PublishPlugin } from './PublishPlugin.d.ts';

/**
 * Plugin instance for Obsidian Publish, managing cloud publishing of vault content.
 *
 * @public
 * @unofficial
 */
export interface PublishPluginInstance extends InternalPluginInstance<PublishPlugin> {
  /** Reference to the app. */
  app: App;

  /** Reference to the publish plugin registration. */
  plugin: PublishPlugin;
}
