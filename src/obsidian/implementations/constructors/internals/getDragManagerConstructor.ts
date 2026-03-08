import type { App } from 'obsidian';
import type { DragManagerConstructor } from '../../../internals/constructors/internals/DragManagerConstructor.ts';

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
