import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SlidesPlugin } from './SlidesPlugin.d.ts';

/**
 * Plugin instance for slides, providing presentation mode for Markdown files.
 * @public
 * @unofficial
 */
export interface SlidesPluginInstance extends InternalPluginInstance<SlidesPlugin> {
  /** Reference to the app. */
  app: App;
}
