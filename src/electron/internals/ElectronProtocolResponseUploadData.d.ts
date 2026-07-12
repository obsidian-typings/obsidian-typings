/**
 * Upload data used as the body of a protocol response for `POST` requests.
 *
 * @public
 * @unofficial
 */
export interface ElectronProtocolResponseUploadData {
  /** MIME type of the content. */
  contentType: string;

  /** Content to be sent. */
  data: Buffer | string;
}
