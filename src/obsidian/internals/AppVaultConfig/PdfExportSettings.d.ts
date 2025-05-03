/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface PdfExportSettings {
    /**
     * Default: 100.
     */
    downscalePercent: number;

    /**
     * Default: false.
     */
    landscape: boolean;

    /**
     * Default: '0'.
     */
    margin: string;

    /**
     * Default: 'letter'.
     */
    pageSize: string;
}
