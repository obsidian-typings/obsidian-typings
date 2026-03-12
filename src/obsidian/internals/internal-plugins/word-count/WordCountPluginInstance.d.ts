import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { WordCountPlugin } from './WordCountPlugin.d.ts';

/**
 * Plugin instance for word count, displaying word and character counts in the status bar.
 *
 * @public
 * @unofficial
 */
export interface WordCountPluginInstance extends InternalPluginInstance<WordCountPlugin> {
  /** Reference to the app. */
  app: App;

  /** Whether this plugin is enabled by default. */
  defaultOn: true;

  /** Reference to the word count plugin registration. */
  plugin: WordCountPlugin;
}
