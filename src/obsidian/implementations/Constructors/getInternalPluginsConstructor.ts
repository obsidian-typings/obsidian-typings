import type { App } from 'obsidian';
import type { InternalPluginsConstructor } from '../../internals/Constructors/InternalPluginsConstructor.ts';

/**
 * Get the InternalPlugins constructor.
 *
 * @param app - The app instance.
 * @returns The InternalPlugins constructor.
 * @public @unofficial
 */
export function getInternalPluginsConstructor(app: App): InternalPluginsConstructor {
    return app.internalPlugins.constructor as InternalPluginsConstructor;
}
