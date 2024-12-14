import type { App } from 'obsidian';
import type { InternalPlugin } from '../../internals/InternalPlugins/InternalPlugin.js';
import type { InternalPlugins } from '../../internals/InternalPlugins/InternalPlugins.js';

type InternalPluginConstructor<Instance> = new(
    app: App,
    instance: Instance,
    internalPlugins: InternalPlugins
) => InternalPlugin<Instance>;

/**
 * Get the InternalPlugin constructor.
 *
 * @param app - The app instance.
 * @returns The InternalPlugin constructor.
 * @public
 */
export function getInternalPluginConstructor<Instance>(app: App): InternalPluginConstructor<Instance> {
    const anyPlugin = Object.values(app.internalPlugins.plugins)[0];
    if (!anyPlugin) {
        throw new Error('No internal plugin found');
    }
    return anyPlugin.constructor as InternalPluginConstructor<Instance>;
}
