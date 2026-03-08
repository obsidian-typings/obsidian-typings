import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { Commands } from '../../../internals/commands/Commands.d.ts';

type CommandsConstructor = ExtractConstructor<Commands>;

/**
 * Get the Commands constructor.
 *
 * @param app - The app instance.
 * @returns The Commands constructor.
 *
 * @public
 * @unofficial
 */
export function getCommandsConstructor(app: App): CommandsConstructor {
    return app.commands.constructor as CommandsConstructor;
}
