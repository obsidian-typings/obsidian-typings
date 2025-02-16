import type { App } from 'obsidian';
import type { InternalPlugin } from '../InternalPlugins/InternalPlugin.d.ts';
import type { InternalPlugins } from '../InternalPlugins/InternalPlugins.d.ts';

/**
 * The InternalPlugin constructor.
 *
 * @public
 */
export type InternalPluginConstructor<Instance> = new(
    app: App,
    instance: Instance,
    internalPlugins: InternalPlugins
) => InternalPlugin<Instance>;
