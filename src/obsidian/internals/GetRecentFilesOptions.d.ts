/**
 * Options for getting recent files.
 * @public
 * @unofficial
 */
export interface GetRecentFilesOptions {
    /**
     * The maximum number of files to return.
     */
    maxCount: number;

    /**
     * Whether to show canvas files.
     */
    showCanvas: boolean;

    /**
     * Whether to show image files.
     */
    showImages: boolean;

    /**
     * Whether to show markdown files.
     */
    showMarkdown: boolean;

    /**
     * Whether to show non-attachments (canvas, base).
     */
    showNonAttachments: boolean;

    /**
     * Whether to show non-image attachments.
     */
    showNonImageAttachments: boolean;
}
