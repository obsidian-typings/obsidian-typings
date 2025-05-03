import type { BookmarksView } from '../../InternalPlugins/Bookmarks/BookmarksView.d.ts';
import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';
import type { BookmarksPluginInstance } from './BookmarksPluginInstance.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface BookmarksViewConstructor
    extends TypedViewConstructor<BookmarksView, [bookmarksPluginInstance: BookmarksPluginInstance]>
{}
