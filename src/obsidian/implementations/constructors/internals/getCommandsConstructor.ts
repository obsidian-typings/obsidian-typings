import type { App } from 'obsidian';

import type { Commands } from '../../../internals/commands/Commands.d.ts';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Commands constructor.
 *
 * @param app - The app instance.
 * @returns The Commands constructor.
 *
 * @public
 * @unofficial
 */
export function getCommandsConstructor(app: App): ExtractConstructor<Commands> {
  return app.commands.constructor as ExtractConstructor<Commands>;
}
