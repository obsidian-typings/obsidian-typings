import type { ElectronReferrer } from './ElectronReferrer.d.ts';
import type { ElectronUploadFile } from './ElectronUploadFile.d.ts';
import type { ElectronUploadRawData } from './ElectronUploadRawData.d.ts';

/**
 * Options for {@link ElectronBrowserWindow.loadURL}.
 *
 * @public
 * @unofficial
 */
export interface ElectronBrowserWindowLoadURLOptions {
  /**
   * Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the
   * specified `url` is a data url and needs to load other files.
   */
  baseURLForDataURL?: string;

  /** Extra headers separated by `\n`. */
  extraHeaders?: string;

  /** An HTTP Referrer url. */
  httpReferrer?: ElectronReferrer | string;

  /** The post data to send with the request. */
  postData?: (ElectronUploadFile | ElectronUploadRawData)[];

  /** A user agent originating the request. */
  userAgent?: string;
}
