import {
    SearchComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the SearchComponent constructor.
 *
 * @returns The SearchComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getSearchComponentConstructor(): ExtractConstructor<SearchComponent> {
    return SearchComponent as ExtractConstructor<SearchComponent>;
}
