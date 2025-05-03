import type {
    App,
    Command
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { CommandPaletteModal } from './CommandPaletteModal.d.ts';
import type { CommandPaletteOptions } from './CommandPaletteOptions.d.ts';
import type { CommandPalettePlugin } from './CommandPalettePlugin.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface CommandPalettePluginInstance extends InternalPluginInstance<CommandPalettePlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: true;

    /** @todo Documentation incomplete. */
    modal: CommandPaletteModal;

    /** @todo Documentation incomplete. */
    options: CommandPaletteOptions;

    /** @todo Documentation incomplete. */
    plugin: CommandPalettePlugin;

    /** @todo Documentation incomplete. */
    recentCommands: string[];

    /** @todo Documentation incomplete. */
    getCommands(): Command[];

    /** @todo Documentation incomplete. */
    onExternalSettingsChange(): Promise<void>;

    /** @todo Documentation incomplete. */
    onOpen(): boolean;

    /** @todo Documentation incomplete. */
    openCallback(): boolean;

    /** @todo Documentation incomplete. */
    saveSettings(plugin: CommandPalettePlugin): void;
}
