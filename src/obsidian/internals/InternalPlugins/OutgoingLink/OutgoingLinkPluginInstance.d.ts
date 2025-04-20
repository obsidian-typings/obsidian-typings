import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { OutgoingLinkPlugin } from './OutgoingLinkPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface OutgoingLinkPluginInstance extends InternalPluginInstance<OutgoingLinkPlugin> {
    app: App;
    defaultOn: true;
    plugin: OutgoingLinkPlugin;
}
