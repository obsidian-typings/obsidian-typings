import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { CanvasPluginInstance } from './CanvasPluginInstance.d.ts';

/**
 * Internal plugin definition for the Canvas feature.
 * @public
 * @unofficial
 */
export interface CanvasPlugin extends InternalPlugin<CanvasPluginInstance> {}
