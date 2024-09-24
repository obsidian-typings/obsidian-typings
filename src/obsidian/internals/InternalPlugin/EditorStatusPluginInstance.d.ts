import type { App } from 'obsidian';
import type { EditorStatusPlugin } from './EditorStatusPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface EditorStatusPluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    app: App;
    plugin: EditorStatusPlugin;
}
