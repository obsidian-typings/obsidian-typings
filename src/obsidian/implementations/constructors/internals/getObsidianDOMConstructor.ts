import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { ObsidianDOM } from '../../../internals/ObsidianDOM.d.ts';

type ObsidianDOMConstructor = ExtractConstructor<ObsidianDOM>;

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
