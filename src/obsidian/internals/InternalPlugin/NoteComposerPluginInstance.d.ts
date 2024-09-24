import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface NoteComposerPluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    app: App;
}
