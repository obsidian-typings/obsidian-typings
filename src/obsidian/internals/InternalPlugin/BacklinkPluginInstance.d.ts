import type { App } from 'obsidian';
import type { BacklinkPlugin } from './BacklinkPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface BacklinkPluginInstance extends InternalPluginInstance {
    app: App;
    defaultOn: boolean;
    plugin: BacklinkPlugin;
}
