import type { Fold } from './Fold.d.ts';

/**
 * Information about all folds in a document.
 * @public
 * @unofficial
 */
export interface FoldInfo {
  /** Array of folded ranges. */
  folds: Fold[];

  /** Total number of lines in the document. */
  lines: number;
}
