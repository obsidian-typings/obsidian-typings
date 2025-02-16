import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { ZkPrefixerPlugin } from './ZkPrefixerPlugin.d.ts';

/** @public */
export interface ZkPrefixerPluginInstance extends InternalPluginInstance<ZkPrefixerPlugin> {
    app: App;
    plugin: ZkPrefixerPlugin;
}
