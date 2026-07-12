import type { ElectronWebContents } from './ElectronWebContents.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Details passed to an `onSendHeaders` web-request listener.
 *
 * @public
 * @unofficial
 */
export interface ElectronOnSendHeadersListenerDetails {
  /** The frame that initiated the request. */
  frame?: ElectronWebFrameMain;

  /** The request id. */
  id: number;

  /** The HTTP request method. */
  method: string;

  /** The referrer URL. */
  referrer: string;

  /** The request headers. */
  requestHeaders: Record<string, string>;

  /** The resource type of the request. */
  resourceType: 'cspReport' | 'font' | 'image' | 'mainFrame' | 'media' | 'object' | 'other' | 'ping' | 'script' | 'stylesheet' | 'subFrame' | 'webSocket' | 'xhr';

  /** The time the event occurred, in milliseconds since the epoch. */
  timestamp: number;

  /** The request URL. */
  url: string;

  /** The web contents that initiated the request. */
  webContents?: ElectronWebContents;

  /** The id of the web contents that initiated the request. */
  webContentsId?: number;
}
