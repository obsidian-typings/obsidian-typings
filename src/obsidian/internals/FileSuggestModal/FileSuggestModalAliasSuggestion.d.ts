import type {
  SearchResult,
  TFile
} from 'obsidian';

import type { FileSuggestModal } from './FileSuggestModal.d.ts';

/**
 * An alias suggestion offered by a {@link FileSuggestModal}: one of the file's frontmatter aliases that matches the
 * query.
 *
 * @public
 * @unofficial
 */
export interface FileSuggestModalAliasSuggestion {
  /**
   * The matching alias, as {@link obsidian#parseFrontMatterAliases} returns it.
   */
  alias: string;

  /**
   * Whether the file is excluded by the user (the `Excluded files` setting under `Files and links`), which lowers its
   * score by `10`.
   */
  downranked: boolean;

  /**
   * The file the alias belongs to.
   */
  file: TFile;

  /**
   * The fuzzy match of the query against the alias.
   */
  match: SearchResult;

  /**
   * The suggestion type.
   */
  type: 'alias';
}
