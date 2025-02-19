import type {
    ViewCreator,
    WorkspaceLeaf
} from 'obsidian';
import type { BookmarksView } from './BookmarksView.d.ts';

/** @public */
export interface BookmarksPluginViews extends Record<string, ViewCreator> {
    bookmarks(left: WorkspaceLeaf): BookmarksView;
}
