import type { WebPreferences } from './WebPreferences.d.ts';

/**
 * Options for creating an {@link ElectronBrowserView}.
 *
 * @public
 * @unofficial
 */
export interface ElectronBrowserViewConstructorOptions {
  /** Settings of web page's features. */
  webPreferences?: WebPreferences;
}
