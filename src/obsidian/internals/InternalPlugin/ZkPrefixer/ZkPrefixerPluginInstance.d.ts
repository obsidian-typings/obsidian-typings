import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { ZkPrefixerPlugin } from './ZkPrefixerPlugin.js';

/** @public */
export interface ZkPrefixerPluginInstance extends InternalPluginInstance<ZkPrefixerPlugin> {
    app: App;
    plugin: ZkPrefixerPlugin;
}
