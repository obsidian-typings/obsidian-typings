import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { BrowserPluginInstance } from './BrowserPluginInstance.d.ts';

/** @public */
export interface BrowserPlugin extends InternalPlugin<BrowserPluginInstance> {
}
