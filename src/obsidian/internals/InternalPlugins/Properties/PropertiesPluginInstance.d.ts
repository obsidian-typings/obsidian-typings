import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { PropertiesPlugin } from './PropertiesPlugin.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface PropertiesPluginInstance extends InternalPluginInstance<PropertiesPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: false;

    /** @todo Documentation incomplete. */
    plugin: PropertiesPlugin;
}
