import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { EditorStatusPlugin } from './EditorStatusPlugin.d.ts';

/**
 * Plugin instance for editor status, displaying editor information in the status bar.
 * @public
 * @unofficial
 */
export interface EditorStatusPluginInstance extends InternalPluginInstance<EditorStatusPlugin> {
    /** Reference to the app. */
    app: App;

    /** Whether this plugin is enabled by default. */
    defaultOn: true;

    /** Whether this plugin is hidden from the plugin list in settings. */
    hiddenFromList: true;

    /** Reference to the editor status plugin registration. */
    plugin: EditorStatusPlugin;
}
