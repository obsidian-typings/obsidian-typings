import { SearchComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#SearchComponent} constructor.
 *
 * @returns The {@link obsidian#SearchComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getSearchComponentConstructor(): ExtractConstructor<SearchComponent> {
  return SearchComponent as ExtractConstructor<SearchComponent>;
}
