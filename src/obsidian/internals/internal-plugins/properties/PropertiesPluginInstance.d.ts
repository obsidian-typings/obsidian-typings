import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { PropertiesPlugin } from './PropertiesPlugin.d.ts';

/**
 * Plugin instance for properties, managing frontmatter metadata views.
 *
 * @public
 * @unofficial
 */
export interface PropertiesPluginInstance extends InternalPluginInstance<PropertiesPlugin> {
  /** Reference to the app. */
  app: App;

  /** Whether this plugin is enabled by default. */
  defaultOn: false;

  /** Reference to the properties plugin registration. */
  plugin: PropertiesPlugin;
}
