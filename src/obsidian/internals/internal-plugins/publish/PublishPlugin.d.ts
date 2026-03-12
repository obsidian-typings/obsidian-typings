import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { PublishPluginInstance } from './PublishPluginInstance.d.ts';

/**
 * Internal plugin registration for the Obsidian Publish feature.
 *
 * @public
 * @unofficial
 */
export interface PublishPlugin extends InternalPlugin<PublishPluginInstance> {}
