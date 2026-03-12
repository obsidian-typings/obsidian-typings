import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { TagPanePlugin } from './TagPanePlugin.d.ts';

/**
 * Plugin instance for the tag pane, displaying a browseable list of tags in the sidebar.
 *
 * @public
 * @unofficial
 */
export interface TagPanePluginInstance extends InternalPluginInstance<TagPanePlugin> {
  /** Reference to the app. */
  app: App;

  /** Whether this plugin is enabled by default. */
  defaultOn: true;

  /** Reference to the tag pane plugin registration. */
  plugin: TagPanePlugin;
}
