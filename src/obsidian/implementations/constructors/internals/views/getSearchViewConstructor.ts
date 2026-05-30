import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { SearchView } from '../../../../internals/internal-plugins/global-search/SearchView.d.ts';

import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the {@link SearchView} constructor.
 *
 * @param app - The app.
 * @returns The {@link SearchView} constructor.
 *
 * @public
 * @unofficial
 */
export function getSearchViewConstructor(app: App): ExtractConstructor<SearchView> {
  return getViewConstructorByViewType(app, ViewType.Search);
}
