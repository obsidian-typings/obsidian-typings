/**
 * A file to be uploaded as part of a request body.
 *
 * @public
 * @unofficial
 */
export interface ElectronUploadFile {
  /** Path of file to be uploaded. */
  filePath: string;

  /**
   * Number of bytes to read from `offset`.
   *
   * @default `0`
   */
  length: number;

  /** Last modification time in number of seconds since the UNIX epoch. */
  modificationTime: number;

  /**
   * Offset in bytes to start reading from.
   *
   * @default `0`
   */
  offset: number;

  /** The upload data type discriminant. */
  type: 'file';
}
