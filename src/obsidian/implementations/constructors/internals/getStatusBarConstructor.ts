import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { StatusBar } from '../../../internals/StatusBar.d.ts';

/**
 * Get the StatusBar constructor.
 *
 * @param app - The app instance.
 * @returns The StatusBar constructor.
 *
 * @public
 * @unofficial
 */
export function getStatusBarConstructor(app: App): ExtractConstructor<StatusBar> {
  return app.statusBar.constructor as ExtractConstructor<StatusBar>;
}
