/**
 * A chunk of upload data attached to a network request.
 *
 * @public
 * @unofficial
 */
export interface ElectronUploadData {
  /** UUID of blob data. Use `Session.getBlobData` to retrieve the data. */
  blobUUID?: string;

  /** Content being sent. */
  bytes: Buffer;

  /** Path of file being uploaded. */
  file?: string;
}
