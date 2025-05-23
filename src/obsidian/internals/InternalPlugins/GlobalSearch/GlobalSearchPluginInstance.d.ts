import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { GlobalSearchPlugin } from './GlobalSearchPlugin.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface GlobalSearchPluginInstance extends InternalPluginInstance<GlobalSearchPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: true;

    /** @todo Documentation incomplete. */
    plugin: GlobalSearchPlugin;
}
