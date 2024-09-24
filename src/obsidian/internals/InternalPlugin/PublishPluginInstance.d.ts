import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { PublishPlugin } from './PublishPlugin.js';

/** @public */
export interface PublishPluginInstance extends InternalPluginInstance {
    app: App;
    plugin: PublishPlugin;
}
