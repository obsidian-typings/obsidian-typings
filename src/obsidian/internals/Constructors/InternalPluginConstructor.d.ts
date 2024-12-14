import type { App } from "obsidian";
import type { InternalPlugin } from "../InternalPlugins/InternalPlugin.js";
import type { InternalPlugins } from "../InternalPlugins/InternalPlugins.js";

/**
 * The InternalPlugin constructor.
 *
 * @public
 */
export type InternalPluginConstructor<Instance> = new (
    app: App,
    instance: Instance,
    internalPlugins: InternalPlugins
) => InternalPlugin<Instance>;
