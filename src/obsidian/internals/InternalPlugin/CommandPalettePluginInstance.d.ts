import type { App } from 'obsidian';
import type { CommandPalettePlugin } from './CommandPalettePlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface CommandPalettePluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    app: App;
    plugin: CommandPalettePlugin;
}
