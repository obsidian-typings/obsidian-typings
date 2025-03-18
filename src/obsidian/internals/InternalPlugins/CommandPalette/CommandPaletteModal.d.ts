import type {
    Command,
    FuzzySuggestModal
} from 'obsidian';
import type { CommandPalettePluginInstance } from './CommandPalettePluginInstance.d.ts';

/** @public */
export interface CommandPaletteModal extends FuzzySuggestModal<Command> {
    commands: Command[] | null;
    plugin: CommandPalettePluginInstance;
}
