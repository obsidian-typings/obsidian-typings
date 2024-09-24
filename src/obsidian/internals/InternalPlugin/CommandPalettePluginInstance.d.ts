import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { CommandPalettePlugin } from './CommandPalettePlugin.js';

/** @public */
export interface CommandPalettePluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    app: App;
    plugin: CommandPalettePlugin;
}
