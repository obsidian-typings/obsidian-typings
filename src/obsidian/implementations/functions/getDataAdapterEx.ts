import type { App } from 'obsidian';

import type { DataAdapterEx } from '../../internals/DataAdapterEx.d.ts';

/**
 * Get the instance of the current {@link DataAdapterEx}.
 *
 * @param app - The application instance.
 * @returns The data adapter extension.
 *
 * @public
 * @unofficial
 */
export function getDataAdapterEx(app: App): DataAdapterEx {
  return app.vault.adapter as DataAdapterEx;
}
