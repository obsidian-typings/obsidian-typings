import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { AudioRecorderPluginInstance } from './AudioRecorderPluginInstance.d.ts';

/**
 * Internal plugin registration for the audio recorder feature.
 *
 * @public
 * @unofficial
 */
export interface AudioRecorderPlugin extends InternalPlugin<AudioRecorderPluginInstance> {
}
