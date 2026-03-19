import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { SwitcherPluginInstance } from './SwitcherPluginInstance.d.ts';

/**
 * Internal plugin registration for the quick switcher feature.
 *
 * @public
 * @unofficial
 */
export interface SwitcherPlugin extends InternalPlugin<SwitcherPluginInstance> {}
