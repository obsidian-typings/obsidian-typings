import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { Cli } from '../../../internals/cli/Cli.d.ts';

/**
 * Get the Cli constructor.
 *
 * @param app - The app instance.
 * @returns The Cli constructor.
 *
 * @public
 * @unofficial
 */
export function getCliConstructor(app: App): ExtractConstructor<Cli> {
    return app.cli.constructor as ExtractConstructor<Cli>;
}
