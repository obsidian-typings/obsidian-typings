/**
 * Imported attachment.
 *
 * @public
 * @unofficial
 */
export interface ImportedAttachment {
  /**
   * Promise that resolves to the attachment file content, or to `null` when the file cannot be read. `null` itself for a folder, and when the content was not requested.
   */
  data: null | Promise<ArrayBuffer | null>;

  /**
   * An attachment file extension. Empty for a folder.
   */
  extension: string;

  /**
   * An attachment file path. Absent for an image read from the clipboard, and empty when the dropped file has no path.
   */
  filepath?: string;

  /**
   * Whether the attachment is a folder dropped from the file system (desktop only).
   */
  isDirectory?: boolean;

  /**
   * An attachment file name.
   */
  name: string;
}
