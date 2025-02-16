import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { EditorStatusPlugin } from './EditorStatusPlugin.d.ts';

/** @public */
export interface EditorStatusPluginInstance extends InternalPluginInstance<EditorStatusPlugin> {
    app: App;
    defaultOn: true;
    hiddenFromList: true;
    plugin: EditorStatusPlugin;
}
