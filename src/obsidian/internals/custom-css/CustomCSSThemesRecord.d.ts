import type { ThemeManifest } from '../ThemeManifest.d.ts';

/**
 * Record mapping theme names to their manifest metadata.
 *
 * @public
 * @unofficial
 */
export interface CustomCSSThemesRecord extends Record<string, ThemeManifest> {}
