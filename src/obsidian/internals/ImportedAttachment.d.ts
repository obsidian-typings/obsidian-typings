/**
 * Imported attachment.
 *
 * @public
 * @unofficial
 */
export interface ImportedAttachment {
    /** Promise that resolves to the attachment file content. */
    data: Promise<ArrayBuffer>;

    /** An attachment file extension. */
    extension: string;

    /** An attachment file name with extension. */
    filename: string;

    /** An attachment file name. */
    name: string;
}
