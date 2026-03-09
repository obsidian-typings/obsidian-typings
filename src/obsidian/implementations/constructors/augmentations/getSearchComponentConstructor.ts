import {
  SearchComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type SearchComponentConstructor = ExtractConstructor<SearchComponent>;

/**
 * Get the SearchComponent constructor.
 *
 * @returns The SearchComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getSearchComponentConstructor(): SearchComponentConstructor {
  return SearchComponent as SearchComponentConstructor;
}
