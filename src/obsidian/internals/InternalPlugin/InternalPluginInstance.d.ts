import type { InternalPlugin } from "./InternalPlugin.js";

export interface InternalPluginInstance {
    plugin: InternalPlugin<this>;
}
