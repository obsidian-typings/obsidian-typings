import type { Line } from './Line.d.ts';

/**
 * The document data type used in CodeMirror.
 *
 * @public
 * @unofficial
 */
export declare class CmText {
  /** An empty document. */
  static empty: CmText;

  /** The length of the document. */
  readonly length: number;

  /** The number of lines in the document. */
  readonly lines: number;

  /**
   * Get the line at a given 1-based line number.
   *
   * @param n - The 1-based line number.
   * @returns The line.
   */
  line(n: number): Line;

  /**
   * Get the line at the given position.
   *
   * @param pos - The position.
   * @returns The line containing the position.
   */
  lineAt(pos: number): Line;

  /**
   * Create a text from an array of lines.
   *
   * @param text - The lines to create the text from.
   * @returns The created text.
   */
  static of(text: readonly string[]): CmText;

  /**
   * Return the document as a string, using newline characters to separate lines.
   *
   * @param from - The start position.
   * @param to - The end position.
   * @param lineSep - The line separator to use.
   * @returns The string content.
   */
  sliceString(from: number, to?: number, lineSep?: string): string;

  /**
   * Return the document as a string.
   *
   * @returns The string content.
   */
  toString(): string;
}
