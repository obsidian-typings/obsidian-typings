import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { FootnotesPlugin } from './FootnotesPlugin.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface FootnotesPluginInstance extends InternalPluginInstance<FootnotesPlugin> {
    /** @todo Documentation incomplete. */
    initLeaf(): void;
}
