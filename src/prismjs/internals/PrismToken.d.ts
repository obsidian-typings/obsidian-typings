/**
 * Represents a parsed token produced by Prism's tokenizer.
 *
 * @public
 * @unofficial
 */
export declare class PrismToken {
  /** Alias name(s) for the token type. */
  alias: string | string[];

  /** The content of the token, either a string or nested tokens. */
  content: PrismToken[] | string;

  /** Whether the token was matched greedily. */
  greedy: boolean;

  /** The length of the matched string. */
  length: number;

  /** The type of the token. */
  type: string;

  /**
   * Creates a new PrismToken.
   *
   * @param type - The type of the token.
   * @param content - The content of the token.
   * @param alias - Optional alias(es) for the token.
   * @param matchedStr - The original matched string.
   */
  constructor(type: string, content: PrismToken[] | string, alias?: string | string[], matchedStr?: string, greedy?: boolean);

  /**
   * Converts a token or token stream to an HTML string.
   *
   * @param o - The token or token stream to stringify.
   * @param language - The language identifier.
   * @returns The stringified HTML representation.
   */
  static stringify(o: Array<PrismToken | string> | PrismToken | string, language: string, parent?: Array<PrismToken | string>): string;
}
