import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { TemplatesPluginInstance } from './TemplatesPluginInstance.d.ts';

/**
 * Internal plugin registration for the templates feature.
 * @public
 * @unofficial
 */
export interface TemplatesPlugin extends InternalPlugin<TemplatesPluginInstance> {}
