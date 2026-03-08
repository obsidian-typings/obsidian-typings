import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { Plugins } from '../../../internals/plugins/Plugins.d.ts';

/**
 * Get the Plugins constructor.
 *
 * @param app - The app instance.
 * @returns The Plugins constructor.
 *
 * @public
 * @unofficial
 */
export function getPluginsConstructor(app: App): ExtractConstructor<Plugins> {
    return app.plugins.constructor as ExtractConstructor<Plugins>;
}
