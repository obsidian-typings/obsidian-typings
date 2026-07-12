/**
 * Raw data to be uploaded as part of a request body.
 *
 * @public
 * @unofficial
 */
export interface ElectronUploadRawData {
  /** Data to be uploaded. */
  bytes: Buffer;

  /** The upload data type discriminant. */
  type: 'rawData';
}
