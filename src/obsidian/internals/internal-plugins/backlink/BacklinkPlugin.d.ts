import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { BacklinkPluginInstance } from './BacklinkPluginInstance.d.ts';
import type { BacklinkPluginViews } from './BacklinkPluginViews.d.ts';

/**
 * Internal plugin registration for the backlinks feature.
 * @public
 * @unofficial
 */
export interface BacklinkPlugin extends InternalPlugin<BacklinkPluginInstance> {
  /** View creators registered by the backlink plugin. */
  views: BacklinkPluginViews;
}
