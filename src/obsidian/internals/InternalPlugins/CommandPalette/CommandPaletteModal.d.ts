import type {
    Command,
    FuzzySuggestModal
} from 'obsidian';
import type { CommandPalettePluginInstance } from './CommandPalettePluginInstance.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface CommandPaletteModal extends FuzzySuggestModal<Command> {
    /** @todo Documentation incomplete. */
    commands: Command[] | null;

    /** @todo Documentation incomplete. */
    plugin: CommandPalettePluginInstance;
}
