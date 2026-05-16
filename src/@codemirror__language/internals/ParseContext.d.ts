import type { EditorState } from '../../@codemirror__state/internals/EditorState.d.ts';

/**
 * A parse context that can be used to track parsing progress.
 *
 * @public
 * @unofficial
 */
export declare class ParseContext {
  /** The editor state being parsed. */
  readonly state: EditorState;

  /** The viewport range currently visible. */
  readonly viewport: { from: number; to: number };

  /**
   * Get the current parse context, if any.
   *
   * @returns The current parse context, or `null` if none is active.
   */
  static get(): null | ParseContext;

  /**
   * Tell the parse context to skip parsing until the given range is in view.
   *
   * @param from - The start of the range.
   * @param to - The end of the range.
   */
  skipUntilInView(from: number, to: number): void;
}
