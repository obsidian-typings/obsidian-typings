import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { FoldManager } from '../../../internals/FoldManager.d.ts';

/**
 * Get the FoldManager constructor.
 *
 * @param app - The app instance.
 * @returns The FoldManager constructor.
 *
 * @public
 * @unofficial
 */
export function getFoldManagerConstructor(app: App): ExtractConstructor<FoldManager> {
  return app.foldManager.constructor as ExtractConstructor<FoldManager>;
}
