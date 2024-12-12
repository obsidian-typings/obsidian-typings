import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { RandomNotePlugin } from './RandomNotePlugin.js';

/** @public */
export interface RandomNotePluginInstance extends InternalPluginInstance<RandomNotePlugin> {
    app: App;
}
