import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { SlidesPlugin } from './SlidesPlugin.js';

/** @public */
export interface SlidesPluginInstance extends InternalPluginInstance<SlidesPlugin> {
    app: App;
}
