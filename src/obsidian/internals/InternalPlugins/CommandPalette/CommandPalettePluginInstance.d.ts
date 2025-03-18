import type {
    App,
    Command
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { CommandPaletteModal } from './CommandPaletteModal.d.ts';
import type { CommandPaletteOptions } from './CommandPaletteOptions.d.ts';
import type { CommandPalettePlugin } from './CommandPalettePlugin.d.ts';

/** @public */
export interface CommandPalettePluginInstance extends InternalPluginInstance<CommandPalettePlugin> {
    app: App;
    defaultOn: true;
    modal: CommandPaletteModal;
    options: CommandPaletteOptions;
    plugin: CommandPalettePlugin;
    recentCommands: string[];

    getCommands(): Command[];
    onExternalSettingsChange(): Promise<void>;
    onOpen(): boolean;
    openCallback(): boolean;
    saveSettings(plugin: CommandPalettePlugin): void;
}
