import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { OutlinePlugin } from './OutlinePlugin.d.ts';

/**
 * Plugin instance for the outline, displaying headings for the current file.
 * @public
 * @unofficial
 */
export interface OutlinePluginInstance extends InternalPluginInstance<OutlinePlugin> {
  /** Reference to the app. */
  app: App;

  /** Whether this plugin is enabled by default. */
  defaultOn: true;

  /** Reference to the outline plugin registration. */
  plugin: OutlinePlugin;
}
