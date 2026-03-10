import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { CustomCSS } from '../../../internals/custom-css/CustomCSS.d.ts';

/**
 * Get the CustomCSS constructor.
 *
 * @param app - The app instance.
 * @returns The CustomCSS constructor.
 *
 * @public
 * @unofficial
 */
export function getCustomCSSConstructor(app: App): ExtractConstructor<CustomCSS> {
  return app.customCss.constructor as ExtractConstructor<CustomCSS>;
}
