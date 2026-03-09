import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { BookmarksView } from '../../../../internals/internal-plugins/bookmarks/BookmarksView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the BookmarksView constructor.
 *
 * @param app - The app.
 * @returns The BookmarksView constructor.
 *
 * @public
 * @unofficial
 */
export function getBookmarksViewConstructor(app: App): ExtractConstructor<BookmarksView> {
  return getViewConstructorByViewType(app, ViewType.Bookmarks);
}
