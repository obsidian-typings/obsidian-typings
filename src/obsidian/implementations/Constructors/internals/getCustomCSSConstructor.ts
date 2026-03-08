import type { App } from 'obsidian';
import type { CustomCSSConstructor } from '../../../internals/Constructors/internals/CustomCSSConstructor.ts';

/**
 * Get the CustomCSS constructor.
 *
 * @param app - The app instance.
 * @returns The CustomCSS constructor.
 *
 * @public
 * @unofficial
 */
export function getCustomCSSConstructor(app: App): CustomCSSConstructor {
    return app.customCss.constructor as CustomCSSConstructor;
}
