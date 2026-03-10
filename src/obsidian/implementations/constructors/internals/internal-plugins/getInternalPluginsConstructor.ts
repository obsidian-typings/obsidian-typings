import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { InternalPlugins } from '../../../../internals/internal-plugins/InternalPlugins.d.ts';

/**
 * Get the InternalPlugins constructor.
 *
 * @param app - The app instance.
 * @returns The InternalPlugins constructor.
 *
 * @public
 * @unofficial
 */
export function getInternalPluginsConstructor(app: App): ExtractConstructor<InternalPlugins> {
  return app.internalPlugins.constructor as ExtractConstructor<InternalPlugins>;
}
