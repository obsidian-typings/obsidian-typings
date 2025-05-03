import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { BrowserPlugin } from './BrowserPlugin.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface BrowserPluginInstance extends InternalPluginInstance<BrowserPlugin> {
    /** @todo Documentation incomplete. */
    defaultOn: false;

    /** @todo Documentation incomplete. */
    pendingIgnoredURLs: string[];
}
