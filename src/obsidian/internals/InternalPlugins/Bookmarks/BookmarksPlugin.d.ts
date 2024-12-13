import type { WorkspaceLeaf } from 'obsidian';
import type { InternalPlugin } from '../InternalPlugin.js';
import type { BookmarksPluginInstance } from './BookmarksPluginInstance.js';
import type { BookmarksView } from './BookmarksView.js';

/** @public */
export interface BookmarksPlugin extends InternalPlugin<BookmarksPluginInstance> {
    views: {
        bookmarks(left: WorkspaceLeaf): BookmarksView;
    };
}
