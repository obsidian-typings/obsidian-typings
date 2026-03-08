import {
    SearchComponent
} from 'obsidian';
import type { SearchComponentConstructor } from '../../../internals/constructors/augmentations/SearchComponentConstructor.ts';

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
