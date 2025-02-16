import type { WorkspaceLeaf } from 'obsidian';
import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { BookmarksPluginInstance } from './BookmarksPluginInstance.d.ts';
import type { BookmarksView } from './BookmarksView.d.ts';

/** @public */
export interface BookmarksPlugin extends InternalPlugin<BookmarksPluginInstance> {
    views: {
        bookmarks(left: WorkspaceLeaf): BookmarksView;
    };
}
