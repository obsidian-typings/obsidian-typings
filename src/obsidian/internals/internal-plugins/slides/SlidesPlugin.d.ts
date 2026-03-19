import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { SlidesPluginInstance } from './SlidesPluginInstance.d.ts';

/**
 * Internal plugin registration for the slides (presentation mode) feature.
 *
 * @public
 * @unofficial
 */
export interface SlidesPlugin extends InternalPlugin<SlidesPluginInstance> {}
