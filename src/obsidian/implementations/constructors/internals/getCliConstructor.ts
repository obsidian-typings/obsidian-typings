import type { App } from 'obsidian';
import type { CliConstructor } from '../../../internals/constructors/internals/CliConstructor.ts';

/**
 * Get the Cli constructor.
 *
 * @param app - The app instance.
 * @returns The Cli constructor.
 *
 * @public
 * @unofficial
 */
export function getCliConstructor(app: App): CliConstructor {
    return app.cli.constructor as CliConstructor;
}
