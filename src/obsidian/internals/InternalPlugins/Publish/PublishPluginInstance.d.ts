import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { PublishPlugin } from './PublishPlugin.d.ts';

/** @public */
export interface PublishPluginInstance extends InternalPluginInstance<PublishPlugin> {
    app: App;
    plugin: PublishPlugin;
}
