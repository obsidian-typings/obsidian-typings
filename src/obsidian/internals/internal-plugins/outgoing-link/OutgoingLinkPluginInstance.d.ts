import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { OutgoingLinkPlugin } from './OutgoingLinkPlugin.d.ts';

/**
 * Plugin instance for outgoing links, displaying links from the current file.
 * @public
 * @unofficial
 */
export interface OutgoingLinkPluginInstance extends InternalPluginInstance<OutgoingLinkPlugin> {
  /** Reference to the app. */
  app: App;

  /** Whether this plugin is enabled by default. */
  defaultOn: true;

  /** Reference to the outgoing link plugin registration. */
  plugin: OutgoingLinkPlugin;
}
