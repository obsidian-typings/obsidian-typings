import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { FootnotesPluginInstance } from './FootnotesPluginInstance.d.ts';

/**
 * Internal plugin registration for the footnotes feature.
 *
 * @public
 * @unofficial
 */
export interface FootnotesPlugin extends InternalPlugin<FootnotesPluginInstance> {
}
