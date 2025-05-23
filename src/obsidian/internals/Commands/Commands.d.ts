import type {
    App,
    Command
} from 'obsidian';
import type { CommandsCommandsRecord } from './CommandsCommandsRecord.d.ts';
import type { CommandsEditorCommandsRecord } from './CommandsEditorCommandsRecord.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface Commands {
    /**
     * Reference to App.
     */
    app: App;

    /**
     * Commands *without* editor callback, will always be available in the command palette.
     *
     * @example `app:open-vault` or `app:reload`.
     */
    commands: CommandsCommandsRecord;

    /**
     * Commands *with* editor callback, will only be available when editor is active and callback returns.
     * true.
     *
     * @example `editor:fold-all` or `command-palette:open`.
     */
    editorCommands: CommandsEditorCommandsRecord;

    /**
     * Add a command to the command registry.
     *
     * @param command - Command to add.
     */
    addCommand(command: Command): void;

    /**
     * Execute a command by reference.
     *
     * @param command - Command to execute.
     */
    executeCommand(command: Command): boolean;

    /**
     * Execute a command by ID.
     *
     * @param commandId - ID of command to execute.
     */
    executeCommandById(commandId: string): boolean;

    /**
     * Find a command by ID.
     *
     * @param commandId - ID of command to find.
     */
    findCommand(commandId: string): Command | undefined;

    /**
     * Lists **all** commands, both with and without editor callback.
     */
    listCommands(): Command[];

    /**
     * Remove a command from the command registry.
     *
     * @param commandId - ID of command to remove.
     */
    removeCommand(commandId: string): void;
}
