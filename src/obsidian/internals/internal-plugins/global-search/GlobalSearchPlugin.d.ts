import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { GlobalSearchPluginInstance } from './GlobalSearchPluginInstance.d.ts';

/**
 * Internal plugin registration for the global search feature.
 *
 * @public
 * @unofficial
 */
export interface GlobalSearchPlugin extends InternalPlugin<GlobalSearchPluginInstance> {}
