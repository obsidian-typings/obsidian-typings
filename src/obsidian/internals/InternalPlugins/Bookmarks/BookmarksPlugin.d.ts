import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { BookmarksPluginInstance } from './BookmarksPluginInstance.d.ts';
import type { BookmarksPluginViews } from './BookmarksPluginViews.d.ts';

/**
 * @public
 * @unofficial
 */
export interface BookmarksPlugin extends InternalPlugin<BookmarksPluginInstance> {
    views: BookmarksPluginViews;
}
