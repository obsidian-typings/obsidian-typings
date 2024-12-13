import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { EditorStatusPlugin } from './EditorStatusPlugin.js';

/** @public */
export interface EditorStatusPluginInstance extends InternalPluginInstance<EditorStatusPlugin> {
    app: App;
    defaultOn: boolean;
    plugin: EditorStatusPlugin;
}
