import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { EditorStatusPlugin } from './EditorStatusPlugin.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface EditorStatusPluginInstance extends InternalPluginInstance<EditorStatusPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: true;

    /** @todo Documentation incomplete. */
    hiddenFromList: true;

    /** @todo Documentation incomplete. */
    plugin: EditorStatusPlugin;
}
