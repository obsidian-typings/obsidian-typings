import type { ElectronUploadFile } from './ElectronUploadFile.d.ts';
import type { ElectronUploadRawData } from './ElectronUploadRawData.d.ts';

/**
 * The post data sent to a new window.
 *
 * @public
 * @unofficial
 */
export interface ElectronPostBody {
  /**
   * The boundary used to separate multiple parts of the message. Only valid when `contentType` is `multipart/form-data`.
   */
  boundary?: string;

  /**
   * The `content-type` header used for the data. One of `application/x-www-form-urlencoded` or `multipart/form-data`.
   */
  contentType: string;

  /** The post data to be sent to the new window. */
  data: (ElectronUploadFile | ElectronUploadRawData)[];
}
