import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { PagePreviewPlugin } from './PagePreviewPlugin.d.ts';

/**
 * Plugin instance for page preview, showing hover previews of linked notes.
 *
 * @public
 * @unofficial
 */
export interface PagePreviewPluginInstance extends InternalPluginInstance<PagePreviewPlugin> {
  /** Reference to the app. */
  app: App;

  /** Whether this plugin is enabled by default. */
  defaultOn: true;
}
