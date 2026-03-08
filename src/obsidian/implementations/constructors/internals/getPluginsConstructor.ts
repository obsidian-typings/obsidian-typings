import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { Plugins } from '../../../internals/plugins/Plugins.d.ts';

type PluginsConstructor = ExtractConstructor<Plugins>;

/**
 * Get the Plugins constructor.
 *
 * @param app - The app instance.
 * @returns The Plugins constructor.
 *
 * @public
 * @unofficial
 */
export function getPluginsConstructor(app: App): PluginsConstructor {
    return app.plugins.constructor as PluginsConstructor;
}
