import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { BacklinkPluginInstance } from './BacklinkPluginInstance.d.ts';
import type { BacklinkPluginViews } from './BacklinkPluginViews.d.ts';

/** @public */
export interface BacklinkPlugin extends InternalPlugin<BacklinkPluginInstance> {
    views: BacklinkPluginViews;
}
