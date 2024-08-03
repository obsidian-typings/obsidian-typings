import type { InternalPlugin } from "./index.js";

export interface InternalPluginInstance {
    plugin: InternalPlugin<this>;
}
