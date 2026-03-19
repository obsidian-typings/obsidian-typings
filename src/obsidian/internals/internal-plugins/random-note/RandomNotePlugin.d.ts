import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { RandomNotePluginInstance } from './RandomNotePluginInstance.d.ts';

/**
 * Internal plugin registration for the random note feature.
 *
 * @public
 * @unofficial
 */
export interface RandomNotePlugin extends InternalPlugin<RandomNotePluginInstance> {}
