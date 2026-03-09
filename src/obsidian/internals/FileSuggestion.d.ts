import type { TFile } from 'obsidian';

/**
 * File suggestion.
 * @public
 * @unofficial
 */
export interface FileSuggestion {
  /**
   * The file.
   */
  file: TFile | null;

  /**
   * The path.
   */
  path: string;
}
