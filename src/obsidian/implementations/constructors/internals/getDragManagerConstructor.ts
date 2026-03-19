import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { DragManager } from '../../../internals/drag-manager/DragManager.d.ts';

/**
 * Get the DragManager constructor.
 *
 * @param app - The app instance.
 * @returns The DragManager constructor.
 *
 * @public
 * @unofficial
 */
export function getDragManagerConstructor(app: App): ExtractConstructor<DragManager> {
  return app.dragManager.constructor as ExtractConstructor<DragManager>;
}
