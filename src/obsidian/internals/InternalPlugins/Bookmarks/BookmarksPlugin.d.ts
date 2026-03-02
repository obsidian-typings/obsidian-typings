import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { BookmarksPluginInstance } from './BookmarksPluginInstance.d.ts';
import type { BookmarksPluginViews } from './BookmarksPluginViews.d.ts';

/**
 * Internal plugin registration for the bookmarks feature.
 * @public
 * @unofficial
 */
export interface BookmarksPlugin extends InternalPlugin<BookmarksPluginInstance> {
    /** View creators registered by the bookmarks plugin. */
    views: BookmarksPluginViews;
}
