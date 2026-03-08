import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { TagPanePluginInstance } from './TagPanePluginInstance.d.ts';

/**
 * Internal plugin registration for the tag browser sidebar feature.
 * @public
 * @unofficial
 */
export interface TagPanePlugin extends InternalPlugin<TagPanePluginInstance> {}
