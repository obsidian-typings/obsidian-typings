import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { ViewRegistry } from '../../../internals/view-registry/ViewRegistry.d.ts';

/**
 * Get the ViewRegistry constructor.
 *
 * @param app - The app instance.
 * @returns The ViewRegistry constructor.
 *
 * @public
 * @unofficial
 */
export function getViewRegistryConstructor(app: App): ExtractConstructor<ViewRegistry> {
    return app.viewRegistry.constructor as ExtractConstructor<ViewRegistry>;
}
