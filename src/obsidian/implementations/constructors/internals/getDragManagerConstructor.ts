import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { DragManager } from '../../../internals/drag-manager/DragManager.d.ts';

type DragManagerConstructor = ExtractConstructor<DragManager>;

/**
 * Get the DragManager constructor.
 *
 * @param app - The app instance.
 * @returns The DragManager constructor.
 *
 * @public
 * @unofficial
 */
export function getDragManagerConstructor(app: App): DragManagerConstructor {
    return app.dragManager.constructor as DragManagerConstructor;
}
