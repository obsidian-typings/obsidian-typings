import type {
    App,
    Command
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { CommandPaletteModal } from './CommandPaletteModal.d.ts';
import type { CommandPaletteOptions } from './CommandPaletteOptions.d.ts';
import type { CommandPalettePlugin } from './CommandPalettePlugin.d.ts';

/**
 * Plugin instance for the command palette, providing the fuzzy command search modal.
 * @public
 * @unofficial
 */
export interface CommandPalettePluginInstance extends InternalPluginInstance<CommandPalettePlugin> {
    /** Reference to the app. */
    app: App;

    /** Whether this plugin is enabled by default. */
    defaultOn: true;

    /** The command palette fuzzy suggest modal. */
    modal: CommandPaletteModal;

    /** Configuration options for the command palette. */
    options: CommandPaletteOptions;

    /** Reference to the command palette plugin registration. */
    plugin: CommandPalettePlugin;

    /** List of recently used command IDs. */
    recentCommands: string[];

    /** Get the list of available commands for the palette. */
    getCommands(): Command[];

    /** Handle external settings file changes and reload configuration. */
    onExternalSettingsChange(): Promise<void>;

    /** Called when the command palette is opened. */
    onOpen(): boolean;

    /** Callback invoked to open the command palette. */
    openCallback(): boolean;

    /** Save the command palette settings. */
    saveSettings(plugin: CommandPalettePlugin): void;
}
