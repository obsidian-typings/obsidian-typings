/**
 * A token emitted by core Search's tokenizer. Content is decoded; pos is an offset in the raw query.
 *
 * @public
 * @unofficial
 */
export interface SearchQueryToken {
  /** The decoded token content, without quote or regex delimiters. */
  content: string;

  /** The starting UTF-16 offset in the raw query. */
  pos: number;

  /** The token category. Uppercase AND is ordinary text. */
  type: 'bracket' | 'colon' | 'empty' | 'false' | 'greaterthan' | 'lessthan' | 'not' | 'or' | 'parenthesis' | 'quote' | 'regex' | 'text' | 'true';
}
