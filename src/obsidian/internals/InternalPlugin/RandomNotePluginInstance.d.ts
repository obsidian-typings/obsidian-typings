import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface RandomNotePluginInstance extends InternalPluginInstance {
    app: App;
}
