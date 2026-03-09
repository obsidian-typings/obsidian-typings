import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { ZkPrefixerPlugin } from './ZkPrefixerPlugin.d.ts';

/**
 * Plugin instance for the Zettelkasten prefixer, prepending unique IDs to new note filenames.
 * @public
 * @unofficial
 */
export interface ZkPrefixerPluginInstance extends InternalPluginInstance<ZkPrefixerPlugin> {
  /** Reference to the app. */
  app: App;

  /** Reference to the Zettelkasten prefixer plugin registration. */
  plugin: ZkPrefixerPlugin;
}
