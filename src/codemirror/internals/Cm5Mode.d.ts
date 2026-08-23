import type { Cm5InnerModeResult } from './Cm5InnerModeResult.d.ts';
import type { Cm5StringStream } from './Cm5StringStream.d.ts';

/**
 * A CodeMirror 5 mode definition for syntax highlighting.
 *
 * @typeParam T - The type of the mode's state object.
 * @public
 * @unofficial
 */
export interface Cm5Mode<T> {
  /** String that ends a block comment. */
  blockCommentEnd?: string;
  /** String to put at the start of continued lines in a block comment. */
  blockCommentLead?: string;
  /** String that starts a block comment. */
  blockCommentStart?: string;
  /** Trigger a re-indent whenever one of the characters in the string is typed. */
  electricChars?: string;
  /** Trigger a re-indent whenever the regex matches the part of the line before the cursor. */
  electricInput?: RegExp;
  /** String that starts a line comment. */
  lineComment?: string;
  /** The name of the mode. */
  name?: string;

  /**
   * Called whenever a blank line is passed over, so that the parser state can be updated.
   *
   * @param state - The current parser state.
   */
  blankLine?(state: T): void;

  /**
   * Given a state, returns a safe copy of that state.
   *
   * @param state - The state to copy.
   * @returns A copy of the state.
   */
  copyState?(state: T): T;

  /**
   * Returns the token type of the current state, for modes that expose one.
   *
   * @param state - The current parser state.
   * @returns The token type, or `null` when the state has none.
   */
  getType?(state: T): null | string;

  /**
   * Returns the number of spaces of indentation that should be used.
   *
   * @param state - The current parser state.
   * @param textAfter - The text after the current position.
   * @param line - The whole text of the line.
   * @returns The number of spaces to indent.
   */
  indent?(state: T, textAfter: string, line: string): number;

  /**
   * Returns the innermost mode and state at the given state, for modes that wrap other modes.
   *
   * @param state - The current parser state.
   * @returns The innermost mode and its state.
   */
  innerMode?(state: T): Cm5InnerModeResult;

  /**
   * Produces a state object to be used at the start of a document.
   *
   * @returns The initial state.
   */
  startState?(): T;

  /**
   * Reads one token from the stream, optionally updates the state, and returns a style string.
   *
   * @param stream - The string stream to read from.
   * @param state - The current parser state.
   * @returns A style string, or `null` for unstyled tokens.
   */
  token(stream: Cm5StringStream, state: T): null | string;
}
