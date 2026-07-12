import type { ElectronPostBody } from './ElectronPostBody.d.ts';
import type { ElectronReferrer } from './ElectronReferrer.d.ts';

/**
 * Details about a window open request handled by a window open handler.
 *
 * @public
 * @unofficial
 */
export interface ElectronHandlerDetails {
  /** The disposition requested for the new window. */
  disposition: 'background-tab' | 'default' | 'foreground-tab' | 'new-window' | 'other' | 'save-to-disk';

  /** Comma-separated list of window features provided to `window.open()`. */
  features: string;

  /** Name of the window provided in `window.open()`. */
  frameName: string;

  /** The post data that will be sent to the new window, if any. */
  postBody?: ElectronPostBody;

  /** The referrer that will be passed to the new window. */
  referrer: ElectronReferrer;

  /** The resolved version of the URL passed to `window.open()`. */
  url: string;
}
