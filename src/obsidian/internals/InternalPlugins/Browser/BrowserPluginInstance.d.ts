import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { BrowserPlugin } from './BrowserPlugin.d.ts';

/** @public */
export interface BrowserPluginInstance extends InternalPluginInstance<BrowserPlugin> {
    defaultOn: false;
    pendingIgnoredURLs: string[];
}
