import type { App } from 'obsidian';
import type { CommandsConstructor } from '../../../internals/constructors/internals/CommandsConstructor.ts';

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
