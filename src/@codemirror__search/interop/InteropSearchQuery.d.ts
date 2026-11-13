import type { LezerInterop } from '../../@lezer__common/interop/LezerInterop.d.ts';
import type { SearchQuery } from '../internals/SearchQuery.d.ts';

/**
 * The selected CodeMirror `SearchQuery` contract at Obsidian's editor overlay boundary.
 *
 * @public
 * @unofficial
 */
export type InteropSearchQuery = LezerInterop<'SearchQuery', SearchQuery>;
