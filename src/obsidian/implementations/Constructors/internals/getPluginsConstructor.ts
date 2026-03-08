import type { App } from 'obsidian';
import type { PluginsConstructor } from '../../../internals/Constructors/internals/PluginsConstructor.ts';

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
