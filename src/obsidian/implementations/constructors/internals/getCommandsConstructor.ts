import type { App } from 'obsidian';
import type { Commands } from '../../../internals/commands/Commands.d.ts';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

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
