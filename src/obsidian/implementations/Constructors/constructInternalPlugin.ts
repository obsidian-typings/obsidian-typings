import type { App } from 'obsidian';
import type { InternalPlugin } from '../../internals/InternalPlugins/InternalPlugin.js';
import type { InternalPlugins } from '../../internals/InternalPlugins/InternalPlugins.js';

type InternalPluginConstructor<Instance> = new(
    app: App,
    instance: Instance,
    internalPlugins: InternalPlugins
) => InternalPlugin<Instance>;

/**
 * Constructs a new InternalPlugin instance.
 *
 * @param app - The app instance.
 * @param instance - The instance of the plugin.
 * @param internalPlugins - The internal plugins instance.
 * @returns The constructed InternalPlugin instance.
 */
export function constructInternalPlugin<Instance>(
    app: App,
    instance: Instance,
    internalPlugins: InternalPlugins
): InternalPlugin<Instance> {
    const anyPlugin = Object.values(app.internalPlugins.plugins)[0];
    if (!anyPlugin) {
        throw new Error('No internal plugin found');
    }
    return new (anyPlugin.constructor as InternalPluginConstructor<Instance>)(app, instance, internalPlugins);
}
