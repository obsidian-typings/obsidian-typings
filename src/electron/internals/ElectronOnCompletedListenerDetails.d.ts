import type { ElectronWebContents } from './ElectronWebContents.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Details passed to an `onCompleted` web-request listener.
 *
 * @public
 * @unofficial
 */
export interface ElectronOnCompletedListenerDetails {
  /** The error description, if any. */
  error: string;

  /** The frame that initiated the request. */
  frame?: ElectronWebFrameMain;

  /** Whether the response was fetched from cache. */
  fromCache: boolean;

  /** The request id. */
  id: number;

  /** The HTTP request method. */
  method: string;

  /** The referrer URL. */
  referrer: string;

  /** The resource type of the request. */
  resourceType: 'cspReport' | 'font' | 'image' | 'mainFrame' | 'media' | 'object' | 'other' | 'ping' | 'script' | 'stylesheet' | 'subFrame' | 'webSocket' | 'xhr';

  /** The response headers. */
  responseHeaders?: Record<string, string[]>;

  /** The HTTP status code. */
  statusCode: number;

  /** The HTTP status line. */
  statusLine: string;

  /** The time the event occurred, in milliseconds since the epoch. */
  timestamp: number;

  /** The request URL. */
  url: string;

  /** The web contents that initiated the request. */
  webContents?: ElectronWebContents;

  /** The id of the web contents that initiated the request. */
  webContentsId?: number;
}
