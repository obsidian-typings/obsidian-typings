/**
 * Represents a document input for the parser.
 *
 * @public
 * @unofficial
 */
export interface Input {
  /** The total length of the input. */
  readonly length: number;

  /** Whether the input is divided into line-sized chunks. */
  readonly lineChunks: boolean;

  /**
   * Get a chunk of input starting at the given position.
   *
   * @param from - The start position.
   * @returns The chunk string.
   */
  chunk(from: number): string;

  /**
   * Read a range of input.
   *
   * @param from - The start position.
   * @param to - The end position.
   * @returns The string content.
   */
  read(from: number, to: number): string;
}
