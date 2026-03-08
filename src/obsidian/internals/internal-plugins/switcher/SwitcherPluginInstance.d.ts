import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SwitcherPlugin } from './SwitcherPlugin.d.ts';

/**
 * Plugin instance for the quick switcher, providing fuzzy file search and navigation.
 * @public
 * @unofficial
 */
export interface SwitcherPluginInstance extends InternalPluginInstance<SwitcherPlugin> {
    /** Reference to the app. */
    app: App;

    /** Whether this plugin is enabled by default. */
    defaultOn: true;

    /** Reference to the switcher plugin registration. */
    plugin: SwitcherPlugin;
}
