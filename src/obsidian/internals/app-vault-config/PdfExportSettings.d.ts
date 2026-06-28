/**
 * Settings for PDF export configuration.
 *
 * @public
 * @unofficial
 */
export interface PdfExportSettings {
  /**
   * The scale percentage applied to the exported PDF.
   *
   * @default `100`
   */
  downscalePercent: number;

  /**
   * Whether the PDF is exported in landscape orientation.
   *
   * @default `false`
   */
  landscape: boolean;

  /**
   * The page margin setting.
   *
   * @default `'0'`
   */
  margin: string;

  /**
   * The page size setting.
   *
   * @default `'letter'`
   */
  pageSize: string;
}
