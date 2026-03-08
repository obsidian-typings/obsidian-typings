import type { App } from 'obsidian';
import type { ObsidianDOMConstructor } from '../../../internals/constructors/internals/ObsidianDOMConstructor.d.ts';

/**
 * Get the ObsidianDOM constructor.
 *
 * @param app - The app instance.
 * @returns The ObsidianDOM constructor.
 *
 * @public
 * @unofficial
 */
export function getObsidianDOMConstructor(app: App): ObsidianDOMConstructor {
    return app.dom.constructor as ObsidianDOMConstructor;
}
