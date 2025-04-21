import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { OutlinePlugin } from './OutlinePlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface OutlinePluginInstance extends InternalPluginInstance<OutlinePlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: true;

    /** @todo Documentation incomplete. */
    plugin: OutlinePlugin;
}
