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

    /**
     * Get the list of available commands for the palette.
     *
     * @returns The available commands.
     */
    getCommands(): Command[];

    /**
     * Handle external settings file changes and reload configuration.
     *
     * @returns A promise that resolves when the settings are reloaded.
     */
    onExternalSettingsChange(): Promise<void>;

    /**
     * Called when the command palette is opened.
     *
     * @returns Whether the command palette was successfully opened.
     */
    onOpen(): boolean;

    /**
     * Callback invoked to open the command palette.
     *
     * @returns Whether the callback was successfully executed.
     */
    openCallback(): boolean;

    /**
     * Save the command palette settings.
     *
     * @param plugin - The command palette plugin to save settings for.
     */
    saveSettings(plugin: CommandPalettePlugin): void;
}
