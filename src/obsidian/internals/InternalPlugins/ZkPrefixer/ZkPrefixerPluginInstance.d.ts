import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { ZkPrefixerPlugin } from './ZkPrefixerPlugin.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface ZkPrefixerPluginInstance extends InternalPluginInstance<ZkPrefixerPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    plugin: ZkPrefixerPlugin;
}
