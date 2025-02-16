import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { RandomNotePlugin } from './RandomNotePlugin.d.ts';

/** @public */
export interface RandomNotePluginInstance extends InternalPluginInstance<RandomNotePlugin> {
    app: App;
}
