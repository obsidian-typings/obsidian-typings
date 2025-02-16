import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { NoteComposerPlugin } from './NoteComposerPlugin.d.ts';

/** @public */
export interface NoteComposerPluginInstance extends InternalPluginInstance<NoteComposerPlugin> {
    app: App;
    defaultOn: true;
}
