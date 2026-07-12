import type { ElectronProtocolResponseUploadData } from './ElectronProtocolResponseUploadData.d.ts';
import type { Session } from './Session.d.ts';

/**
 * A response returned from a protocol handler callback.
 *
 * @public
 * @unofficial
 */
export interface ElectronProtocolResponse {
  /** The charset of the response body. */
  charset?: string;

  /** The response body, as a `Buffer`, `string`, or readable stream depending on the response type. */
  data?: Buffer | NodeJS.ReadableStream | string;

  /** When assigned, the request will fail with this error number. See the net error list. */
  error?: number;

  /** An object containing the response headers. */
  headers?: Record<string, string | string[]>;

  /** The HTTP method. Only used for file and URL responses. */
  method?: string;

  /** The MIME type of the response body. */
  mimeType?: string;

  /** Path to the file which would be sent as the response body. Only used for file responses. */
  path?: string;

  /** The referrer URL. Only used for file and URL responses. */
  referrer?: string;

  /** The session used for requesting the URL. Setting to `null` uses a random independent session. Only used for URL responses. */
  session?: Session;

  /** The HTTP response code. */
  statusCode?: number;

  /** The data used as upload data. Only used for URL responses when `method` is `POST`. */
  uploadData?: ElectronProtocolResponseUploadData;

  /** Download the URL and pipe the result as the response body. Only used for URL responses. */
  url?: string;
}
