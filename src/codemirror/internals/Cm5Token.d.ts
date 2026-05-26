/**
 * A token returned by CodeMirror 5's tokenizer.
 *
 * @public
 * @unofficial
 */
export interface Cm5Token {
  /** The character at which the token ends. */
  end: number;
  /** The character (on the given line) at which the token starts. */
  start: number;
  /** The mode's state at the end of this token. */
  state: unknown;
  /** The token's string. */
  string: string;
  /** The token type the mode assigned to the token, such as "keyword" or "comment". */
  type: null | string;
}
