import type { BrowserWindowConstructorOptions } from './BrowserWindowConstructorOptions.d.ts';
import type { ElectronPostBody } from './ElectronPostBody.d.ts';
import type { ElectronReferrer } from './ElectronReferrer.d.ts';

/**
 * Details about a window created via `window.open`.
 *
 * @public
 * @unofficial
 */
export interface ElectronDidCreateWindowDetails {
  /** The disposition used when creating the window. */
  disposition: 'background-tab' | 'default' | 'foreground-tab' | 'new-window' | 'other' | 'save-to-disk';

  /** Name given to the created window in the `window.open()` call. */
  frameName: string;

  /** The options used to create the BrowserWindow. */
  options: BrowserWindowConstructorOptions;

  /** The post data that will be sent to the new window, if any. */
  postBody?: ElectronPostBody;

  /** The referrer that will be passed to the new window. */
  referrer: ElectronReferrer;

  /** URL for the created window. */
  url: string;
}
