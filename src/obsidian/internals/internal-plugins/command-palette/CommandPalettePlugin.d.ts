import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { CommandPalettePluginInstance } from './CommandPalettePluginInstance.d.ts';

/**
 * Internal plugin registration for the command palette feature.
 *
 * @public
 * @unofficial
 */
export interface CommandPalettePlugin extends InternalPlugin<CommandPalettePluginInstance> {}
