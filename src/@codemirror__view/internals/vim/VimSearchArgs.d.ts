/**
 * Arguments describing how a Vim search command builds and runs its query.
 *
 * @public
 * @unofficial
 */
export interface VimSearchArgs {
  /**
   * Whether the search runs towards the end of the document.
   */
  forward?: boolean;

  /**
   * Where the query came from, distinguishing a prompted search from one seeded by the word under the
   * cursor.
   */
  querySrc?: string;

  /**
   * Whether the position the search started from is pushed onto the jump list.
   */
  toJumplist?: boolean;

  /**
   * Whether the query only matches whole words.
   */
  wholeWordOnly?: boolean;
}
