import type { BookmarksView } from '../../internal-plugins/bookmarks/BookmarksView.d.ts';
import type { TypedViewConstructor } from '../../views/TypedViewConstructor.d.ts';
import type { BookmarksPluginInstance } from './BookmarksPluginInstance.d.ts';

/**
 * Constructor interface for creating BookmarksView instances.
 * @public
 * @unofficial
 */
export interface BookmarksViewConstructor
    extends TypedViewConstructor<BookmarksView, [bookmarksPluginInstance: BookmarksPluginInstance]>
{}
