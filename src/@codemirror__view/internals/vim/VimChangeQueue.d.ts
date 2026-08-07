/**
 * The text an insert-mode key binding replaced, kept so it can be restored if the keys turn out to
 * match a command instead.
 *
 * @public
 * @unofficial
 */
export interface VimChangeQueue {
  /**
   * The keys inserted so far while the match was still undecided.
   */
  inserted: string;

  /**
   * The text each selection had before the keys were inserted.
   */
  removed: string[];
}
