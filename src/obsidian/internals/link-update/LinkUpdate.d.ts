import type {
  App,
  TFile
} from 'obsidian';

import type { PositionedReference } from '../PositionedReference.d.ts';

/**
 * Represents a link that needs to be updated due to a file rename or move.
 * @public
 * @unofficial
 */
export interface LinkUpdate {
  /**
   * Link position in the file.
   */
  reference: PositionedReference;

  /**
   * File that was resolved.
   */
  resolvedFile: TFile;

  /**
   * Paths the file could have been resolved to.
   */
  resolvedPaths: string[];

  /**
   * File that contains the link.
   */
  sourceFile: TFile;
}
