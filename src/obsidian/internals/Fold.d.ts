/**
 * Represents a folded range in the editor.
 * @public
 * @unofficial
 */
export interface Fold {
  /** Start line of the fold. */
  from: number;

  /** End line of the fold. */
  to: number;
}
