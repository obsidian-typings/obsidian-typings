import type { BrowserWindowConstructorOptions } from './BrowserWindowConstructorOptions.d.ts';

/**
 * Response returned by the {@link ElectronWebContents.setWindowOpenHandler} handler, deciding whether a
 * requested new window is allowed or denied.
 *
 * @public
 * @unofficial
 */
export interface ElectronWindowOpenHandlerResponse {
  /** Whether to allow or deny creating the new window. */
  action: 'allow' | 'deny';

  /** Overrides passed to the created {@link ElectronBrowserWindow}. Only used when `action` is `'allow'`. */
  overrideBrowserWindowOptions?: BrowserWindowConstructorOptions;
}
