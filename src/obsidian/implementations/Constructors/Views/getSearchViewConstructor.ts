import type { App } from 'obsidian';
import type { SearchView } from '../../../internals/InternalPlugins/GlobalSearch/SearchView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';

/**
 * Get the SearchView constructor.
 *
 * @returns The SearchView constructor.
 * @public
 */
export function getSearchViewConstructor(app: App): TypedViewConstructor<SearchView> {
    return getViewConstructorByViewType(app, ViewType.Search) as TypedViewConstructor<SearchView>;
}
