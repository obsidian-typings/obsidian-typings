import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { ObsidianDOM } from '../../../internals/ObsidianDOM.d.ts';

/**
 * Get the {@link ObsidianDOM} constructor.
 *
 * @param app - The app instance.
 * @returns The {@link ObsidianDOM} constructor.
 *
 * @public
 * @unofficial
 */
export function getObsidianDOMConstructor(app: App): ExtractConstructor<ObsidianDOM> {
  return app.dom.constructor as ExtractConstructor<ObsidianDOM>;
}
