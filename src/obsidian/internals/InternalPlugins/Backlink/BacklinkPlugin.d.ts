import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { BacklinkPluginInstance } from './BacklinkPluginInstance.d.ts';
import type { BacklinkPluginViews } from './BacklinkPluginViews.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface BacklinkPlugin extends InternalPlugin<BacklinkPluginInstance> {
    /** @todo Documentation incomplete. */
    views: BacklinkPluginViews;
}
