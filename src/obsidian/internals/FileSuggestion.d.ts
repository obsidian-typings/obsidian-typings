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
  file: null | TFile;

  /**
   * The path.
   */
  path: string;
}
