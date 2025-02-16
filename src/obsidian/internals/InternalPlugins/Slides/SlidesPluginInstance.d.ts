import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SlidesPlugin } from './SlidesPlugin.d.ts';

/** @public */
export interface SlidesPluginInstance extends InternalPluginInstance<SlidesPlugin> {
    app: App;
}
