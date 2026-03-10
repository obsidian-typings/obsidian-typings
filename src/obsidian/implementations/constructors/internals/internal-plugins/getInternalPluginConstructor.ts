import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { InternalPlugin } from '../../../../internals/internal-plugins/InternalPlugin.d.ts';

/**
 * Get the InternalPlugin constructor.
 *
 * @param app - The app instance.
 * @returns The InternalPlugin constructor.
 *
 * @public
 * @unofficial
 */
export function getInternalPluginConstructor<Instance>(app: App): ExtractConstructor<InternalPlugin<Instance>> {
  const anyPlugin = Object.values(app.internalPlugins.plugins)[0];
  if (!anyPlugin) {
    throw new Error('No internal plugin found');
  }
  return anyPlugin.constructor as ExtractConstructor<InternalPlugin<Instance>>;
}
