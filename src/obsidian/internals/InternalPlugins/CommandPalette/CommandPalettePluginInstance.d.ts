import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { CommandPalettePlugin } from './CommandPalettePlugin.d.ts';

/** @public */
export interface CommandPalettePluginInstance extends InternalPluginInstance<CommandPalettePlugin> {
    app: App;
    defaultOn: true;
    plugin: CommandPalettePlugin;
}
