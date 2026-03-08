import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { NoteComposerPluginInstance } from './NoteComposerPluginInstance.d.ts';

/**
 * Internal plugin registration for the note composer (merge/split) feature.
 * @public
 * @unofficial
 */
export interface NoteComposerPlugin extends InternalPlugin<NoteComposerPluginInstance> {}
