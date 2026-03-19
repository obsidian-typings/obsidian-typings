/**
 * Has extract.
 *
 * @public
 * @unofficial
 */
export interface HasExtract {
  /**
   * Extracts a date.
   *
   * @param date - The date to extract from.
   * @returns The extracted numeric value.
   */
  extract(date: Date): number;
}
