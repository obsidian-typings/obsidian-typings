import type {
  SearchComponent,
  Setting
} from 'obsidian';

import type { GraphOptions } from './GraphOptions.d.ts';

/**
 * Options section for graph filter settings controlling which files appear in the graph.
 * @public
 * @unofficial
 */
export interface GraphFilterOptions extends GraphOptions {
  /** Search input component for filtering graph nodes by query. */
  search: SearchComponent;

  /** Setting element containing the search input. */
  searchSetting: Setting;
}
