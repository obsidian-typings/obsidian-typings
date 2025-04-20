import type {
    ViewCreator,
    WorkspaceLeaf
} from 'obsidian';
import type { BookmarksView } from './BookmarksView.d.ts';

/**
 * @public
 * @unofficial
 */
export interface BookmarksPluginViews extends Record<string, ViewCreator> {
    /**
     * @todo Documentation incomplete.
     */
    bookmarks(left: WorkspaceLeaf): BookmarksView;
}
