import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { RandomNotePlugin } from './RandomNotePlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface RandomNotePluginInstance extends InternalPluginInstance<RandomNotePlugin> {
    /** @todo Documentation incomplete. */
    app: App;
}
