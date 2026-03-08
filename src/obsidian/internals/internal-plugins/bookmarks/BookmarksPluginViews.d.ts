import type {
    ViewCreator,
    WorkspaceLeaf
} from 'obsidian';
import type { BookmarksView } from './BookmarksView.d.ts';

/**
 * View creators registered by the bookmarks plugin.
 * @public
 * @unofficial
 */
export interface BookmarksPluginViews extends Record<string, ViewCreator> {
    /**
     * Create a bookmarks view in the given workspace leaf.
     *
     * @param left - The workspace leaf to create the bookmarks view in.
     * @returns The created bookmarks view.
     */
    bookmarks(left: WorkspaceLeaf): BookmarksView;
}
