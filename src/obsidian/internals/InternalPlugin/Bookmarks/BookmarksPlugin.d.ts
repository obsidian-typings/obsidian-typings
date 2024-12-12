import type { WorkspaceLeaf } from 'obsidian';
import type { BookmarksView } from './BookmarksView.js';
import type { BookmarksPluginInstance } from './BookmarksPluginInstance.js';
import type { InternalPlugin } from '../InternalPlugin.js';

/** @public */
export interface BookmarksPlugin extends InternalPlugin<BookmarksPluginInstance> {
    views: {
        bookmarks(left: WorkspaceLeaf): BookmarksView;
    };
}
