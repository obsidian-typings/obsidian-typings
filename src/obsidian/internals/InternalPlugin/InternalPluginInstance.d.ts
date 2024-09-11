import type { InternalPlugin } from './InternalPlugin.js';

/** @public */
export interface InternalPluginInstance {
    plugin: InternalPlugin<this>;
}
