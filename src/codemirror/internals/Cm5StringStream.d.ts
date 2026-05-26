/**
 * A CodeMirror 5 StringStream instance for tokenizing text.
 *
 * @public
 * @unofficial
 */
export interface Cm5StringStream {
  /** Position in the string where the last column measurement was taken. */
  lastColumnPos: number;
  /** Cached column value at {@link Cm5StringStream.lastColumnPos}. */
  lastColumnValue: number;
  /** Start offset of the current line within the document. */
  lineStart: number;
  /** Current position in the string. */
  pos: number;
  /** Position where the current token started. */
  start: number;
  /** The current line's content. */
  string: string;
  /** Number of spaces per tab character. */
  tabSize: number;

  /**
   * Backs up the stream n characters.
   *
   * @param n - The number of characters to back up.
   */
  backUp(n: number): void;

  /**
   * Returns the column (taking into account tabs) at which the current token starts.
   *
   * @returns The column number.
   */
  column(): number;

  /**
   * Gets the string between the start of the current token and the current stream position.
   *
   * @returns The current token string.
   */
  current(): string;

  /**
   * If the next character in the stream matches the given argument, it is consumed and returned.
   *
   * @param match - A character, regular expression, or predicate function.
   * @returns The matched character, or empty string if no match.
   */
  eat(match: ((char: string) => boolean) | RegExp | string): string;

  /**
   * Shortcut for eatWhile when matching white-space.
   *
   * @returns `true` if any whitespace was consumed.
   */
  eatSpace(): boolean;

  /**
   * Repeatedly calls eat with the given argument, until it fails.
   *
   * @param match - A character, regular expression, or predicate function.
   * @returns `true` if any characters were consumed.
   */
  eatWhile(match: ((char: string) => boolean) | RegExp | string): boolean;

  /**
   * Returns `true` only if the stream is at the end of the line.
   *
   * @returns Whether the stream is at end of line.
   */
  eol(): boolean;

  /**
   * Tells you how far the current line has been indented, in spaces.
   *
   * @returns The indentation in spaces.
   */
  indentation(): number;

  /**
   * Matches against a string or regular expression pattern.
   *
   * @param pattern - The string pattern to match.
   * @param consume - Whether to advance the stream on match.
   * @param caseFold - Whether to match case-insensitively.
   * @returns `true` if the pattern matched.
   */
  match(pattern: string, consume?: boolean, caseFold?: boolean): boolean;

  /**
   * Matches against a regular expression pattern.
   *
   * @param pattern - The regular expression to match.
   * @param consume - Whether to advance the stream on match.
   * @returns The match array, or `null` if no match.
   */
  match(pattern: RegExp, consume?: boolean): null | string[];

  /**
   * Returns the next character in the stream and advances it.
   *
   * @returns The next character, or `null` at end of line.
   */
  next(): null | string;

  /**
   * Returns the next character in the stream without advancing it.
   *
   * @returns The next character, or `null` at end of line.
   */
  peek(): null | string;

  /**
   * Skips to the next occurrence of the given character on the current line.
   *
   * @param ch - The character to skip to.
   * @returns `true` if the character was found.
   */
  skipTo(ch: string): boolean;

  /** Moves the position to the end of the line. */
  skipToEnd(): void;

  /**
   * Returns `true` only if the stream is at the start of the line.
   *
   * @returns Whether the stream is at start of line.
   */
  sol(): boolean;
}
