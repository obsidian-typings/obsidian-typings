import type { App } from 'obsidian';
import type { FoldManagerConstructor } from '../../../internals/constructors/internals/FoldManagerConstructor.ts';

/**
 * Get the FoldManager constructor.
 *
 * @param app - The app instance.
 * @returns The FoldManager constructor.
 *
 * @public
 * @unofficial
 */
export function getFoldManagerConstructor(app: App): FoldManagerConstructor {
    return app.foldManager.constructor as FoldManagerConstructor;
}
