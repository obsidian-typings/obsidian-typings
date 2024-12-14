import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { NoteComposerPlugin } from './NoteComposerPlugin.js';

/** @public */
export interface NoteComposerPluginInstance extends InternalPluginInstance<NoteComposerPlugin> {
    app: App;
    defaultOn: true;
}
