import type { InternalPlugin } from '../InternalPlugin.js';
import type { BrowserPluginInstance } from './BrowserPluginInstance.js';

/** @public */
export interface BrowserPlugin extends InternalPlugin<BrowserPluginInstance> {
}
