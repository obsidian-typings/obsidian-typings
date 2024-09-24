import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { ZkPrefixerPlugin } from './ZkPrefixerPlugin.js';

/** @public */
export interface ZkPrefixerPluginInstance extends InternalPluginInstance {
    plugin: ZkPrefixerPlugin;
    app: App;
}
