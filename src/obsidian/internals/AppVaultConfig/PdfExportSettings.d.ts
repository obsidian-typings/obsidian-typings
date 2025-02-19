/** @public */
export interface PdfExportSettings {
    /**
     * Default: 'letter'
     */
    pageSize: string;
    /**
     * Default: false
     */
    landscape: boolean;
    /**
     * Default: '0'
     */
    margin: string;
    /**
     * Default: 100
     */
    downscalePercent: number;
}
