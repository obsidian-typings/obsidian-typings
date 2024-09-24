import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface SlidesPluginInstance extends InternalPluginInstance {
    app: App;
}
