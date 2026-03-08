import type { App } from 'obsidian';
import type { ViewRegistryConstructor } from '../../../internals/Constructors/internals/ViewRegistryConstructor.ts';

/**
 * Get the ViewRegistry constructor.
 *
 * @param app - The app instance.
 * @returns The ViewRegistry constructor.
 *
 * @public
 * @unofficial
 */
export function getViewRegistryConstructor(app: App): ViewRegistryConstructor {
    return app.viewRegistry.constructor as ViewRegistryConstructor;
}
