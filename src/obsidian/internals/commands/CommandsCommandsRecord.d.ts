import type { Command } from 'obsidian';

/**
 * Record mapping command IDs to {@link obsidian#Command} objects without editor callbacks.
 *
 * @public
 * @unofficial
 */
export interface CommandsCommandsRecord extends Record<string, Command> {}
