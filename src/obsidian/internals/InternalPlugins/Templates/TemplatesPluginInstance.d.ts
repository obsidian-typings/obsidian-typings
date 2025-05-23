import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { TemplatesPlugin } from './TemplatesPlugin.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface TemplatesPluginInstance extends InternalPluginInstance<TemplatesPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: true;

    /** @todo Documentation incomplete. */
    plugin: TemplatesPlugin;
}
