import type { Command } from 'obsidian';

/**
 * Record mapping command IDs to {@link obsidian#Command} objects with editor callbacks.
 *
 * @public
 * @unofficial
 */
export interface CommandsEditorCommandsRecord extends Record<string, Command> {}
