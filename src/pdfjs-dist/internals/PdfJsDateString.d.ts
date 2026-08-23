/**
 * Converter for the date strings a PDF document stores in its metadata.
 *
 * @public
 * @unofficial
 */
export interface PdfJsDateString {
  /**
   * Converts a PDF date string to a date.
   *
   * @param input - The PDF date string, e.g. `D:20240102030405Z`.
   * @returns The date, or `null` when the string cannot be parsed.
   */
  toDateObject(input: null | string | undefined): Date | null;
}
