import type { App } from 'obsidian';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';
import type { SearchView } from '../../../internals/InternalPlugins/GlobalSearch/SearchView.d.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the SearchView constructor.
 *
 * @returns The SearchView constructor.
 * @public
 */
export function getSearchViewConstructor(app: App): TypedViewConstructor<SearchView> {
    return getViewConstructorByViewType(app, ViewType.Search) as TypedViewConstructor<SearchView>;
}
