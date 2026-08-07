/**
 * The history behind one prompt — the search prompt or the Ex prompt — that the up and down arrows walk
 * through.
 *
 * @public
 * @unofficial
 */
export interface VimHistoryController {
  /**
   * Everything that has been entered at this prompt, oldest first.
   */
  historyBuffer: string[];

  /**
   * The prefix the current walk is filtered by, or `null` when the walk has not started.
   */
  initialPrefix: null | string;

  /**
   * How far back through the history the current walk has reached.
   */
  iterator: number;

  /**
   * Walk to the next history entry starting with the given input.
   *
   * @param input - The prefix to match, which is the text the user typed before starting to walk.
   * @param up - Whether to walk towards older entries.
   * @returns The matching entry, or `undefined` when there is none.
   */
  nextMatch(input: string, up: boolean): string | undefined;

  /**
   * Append an entry to the history.
   *
   * @param input - The entry to append.
   */
  pushInput(input: string): void;

  /**
   * End the current walk, so the next one starts from the newest entry again.
   */
  reset(): void;
}
