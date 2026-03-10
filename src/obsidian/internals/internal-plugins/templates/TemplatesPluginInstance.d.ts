import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { TemplatesPlugin } from './TemplatesPlugin.d.ts';

/**
 * Plugin instance for templates, providing template file insertion into notes.
 * @public
 * @unofficial
 */
export interface TemplatesPluginInstance extends InternalPluginInstance<TemplatesPlugin> {
  /** Reference to the app. */
  app: App;

  /** Whether this plugin is enabled by default. */
  defaultOn: true;

  /** Reference to the templates plugin registration. */
  plugin: TemplatesPlugin;
}
