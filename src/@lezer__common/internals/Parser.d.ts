import type { Input } from './Input.d.ts';
import type { LezerTree } from './LezerTree.d.ts';
import type { LezerTreeFragment } from './LezerTreeFragment.d.ts';
import type { PartialParse } from './PartialParse.d.ts';

/**
 * Abstract base class for parsers.
 *
 * @public
 * @unofficial
 */
export declare abstract class Parser {
  /**
   * Start a parse for the given input.
   *
   * @param input - The document input.
   * @param fragments - Previously parsed fragments that can be reused.
   * @param ranges - The ranges of the document to parse.
   * @returns A partial parse that can be advanced.
   */
  abstract createParse(
    input: Input,
    fragments: readonly LezerTreeFragment[],
    ranges: readonly { from: number; to: number }[]
  ): PartialParse;

  /**
   * Parse a document.
   *
   * @param input - The document input or string.
   * @param fragments - Previously parsed fragments that can be reused.
   * @param ranges - The ranges of the document to parse.
   * @returns The parsed tree.
   */
  parse(
    input: Input | string,
    fragments?: readonly LezerTreeFragment[],
    ranges?: readonly { from: number; to: number }[]
  ): LezerTree;
}
