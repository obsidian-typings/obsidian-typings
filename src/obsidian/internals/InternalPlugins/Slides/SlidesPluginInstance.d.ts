import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SlidesPlugin } from './SlidesPlugin.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface SlidesPluginInstance extends InternalPluginInstance<SlidesPlugin> {
    /** @todo Documentation incomplete. */
    app: App;
}
