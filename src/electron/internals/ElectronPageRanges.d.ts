/**
 * A range of pages to print.
 *
 * @public
 * @unofficial
 */
export interface ElectronPageRanges {
  /** Index of the first page to print (`0`-based). */
  from: number;

  /** Index of the last page to print (inclusive) (`0`-based). */
  to: number;
}
