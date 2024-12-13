import type { App } from 'obsidian';
import type { InternalPlugins } from '../../internals/InternalPlugins/InternalPlugins.js';

type InternalPluginsConstructor = new(app: App) => InternalPlugins;

/**
 * Constructs a new InternalPlugins instance.
 *
 * @param app - The app instance.
 * @returns The constructed InternalPlugins instance.
 */
export function constructInternalPlugins(app: App): InternalPlugins {
    return new (app.internalPlugins.constructor as InternalPluginsConstructor)(app);
}
