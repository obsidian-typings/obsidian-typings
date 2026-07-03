import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';
import type { BasesContext } from '../../../../../internals/internal-plugins/bases/BasesContext.d.ts';
import type { BasesQuery } from '../../../../../internals/internal-plugins/bases/BasesQuery.d.ts';

import { InternalPluginName } from '../../../../constants/InternalPluginName.ts';
import { getQueryControllerConstructor } from '../../../augmentations/bases/getQueryControllerConstructor.ts';

/**
 * Get the {@link BasesContext} constructor.
 *
 * @param app - The app instance.
 * @returns The {@link BasesContext} constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesContextConstructor(app: App): ExtractConstructor<BasesContext> {
  const basesPlugin = app.internalPlugins.getPluginById(InternalPluginName.Bases);
  if (!basesPlugin) {
    throw new Error(`The ${InternalPluginName.Bases} plugin is not loaded.`);
  }
  const queryControllerConstructor = getQueryControllerConstructor();
  const queryController = new queryControllerConstructor(app, basesPlugin.instance, createDiv());
  queryController.query = {} as BasesQuery;
  const basesContext = queryController.buildBasesContext();
  return basesContext.constructor as ExtractConstructor<BasesContext>;
}
