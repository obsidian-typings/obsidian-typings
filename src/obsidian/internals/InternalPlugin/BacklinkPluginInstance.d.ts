import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { BacklinkPlugin } from './BacklinkPlugin.js';

/** @public */
export interface BacklinkPluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    app: App;
    plugin: BacklinkPlugin;
}
