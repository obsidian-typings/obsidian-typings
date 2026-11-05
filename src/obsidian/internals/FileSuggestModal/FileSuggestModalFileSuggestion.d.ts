import type {
  SearchResult,
  TFile
} from 'obsidian';

import type { FileSuggestModal } from './FileSuggestModal.d.ts';

/**
 * A file suggestion offered by a {@link FileSuggestModal}.
 *
 * @public
 * @unofficial
 */
export interface FileSuggestModalFileSuggestion {
  /**
   * Whether the file is excluded by the user (the `Excluded files` setting under `Files and links`), which lowers its
   * score by `10`.
   *
   * Absent on the recent-file suggestions offered for an empty query, which never include excluded files.
   */
  downranked?: boolean;

  /**
   * The suggested file.
   */
  file: TFile;

  /**
   * The fuzzy match of the query against the file's path, or `null` for a recent-file suggestion offered for an
   * empty query.
   */
  match: null | SearchResult;

  /**
   * The suggestion type.
   */
  type: 'file';
}
