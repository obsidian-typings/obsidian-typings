import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { OutgoingLinkPlugin } from './OutgoingLinkPlugin.js';

/** @public */
export interface OutgoingLinkPluginInstance extends InternalPluginInstance {
    app: App;
    defaultOn: boolean;
    plugin: OutgoingLinkPlugin;
}
