import type {
  Command,
  FuzzySuggestModal
} from 'obsidian';
import type { CommandPalettePluginInstance } from './CommandPalettePluginInstance.d.ts';

/**
 * Fuzzy suggest modal used by the command palette to search and execute commands.
 * @public
 * @unofficial
 */
export interface CommandPaletteModal extends FuzzySuggestModal<Command> {
  /** Cached list of available commands, or `null` if not yet populated. */
  commands: Command[] | null;

  /** Reference to the command palette plugin instance. */
  plugin: CommandPalettePluginInstance;
}
