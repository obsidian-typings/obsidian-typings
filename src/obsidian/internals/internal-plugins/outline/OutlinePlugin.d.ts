import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { OutlinePluginInstance } from './OutlinePluginInstance.d.ts';

/**
 * Internal plugin registration for the document outline (table of contents) feature.
 *
 * @public
 * @unofficial
 */
export interface OutlinePlugin extends InternalPlugin<OutlinePluginInstance> {}
