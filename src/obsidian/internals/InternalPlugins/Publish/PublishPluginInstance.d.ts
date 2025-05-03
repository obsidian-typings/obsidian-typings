import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { PublishPlugin } from './PublishPlugin.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface PublishPluginInstance extends InternalPluginInstance<PublishPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    plugin: PublishPlugin;
}
