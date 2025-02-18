import type { BookmarksView } from '../../InternalPlugins/Bookmarks/BookmarksView.d.ts';
import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';
import type { BookmarksPluginInstance } from './BookmarksPluginInstance.d.ts';

/** @public */
export interface BookmarksViewConstructor
    extends TypedViewConstructor<BookmarksView, [bookmarksPluginInstance: BookmarksPluginInstance]>
{}
