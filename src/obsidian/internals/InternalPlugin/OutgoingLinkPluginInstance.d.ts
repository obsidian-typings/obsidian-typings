import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { OutgoingLinkPlugin } from './OutgoingLinkPlugin.js';

/** @public */
export interface OutgoingLinkPluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    plugin: OutgoingLinkPlugin;
    app: App;
}
