import type { WorkspaceLeaf } from "obsidian";
import type { BookmarksPluginInstance } from "../../InternalPlugins/Bookmarks/BookmarksPluginInstance.js";
import type { BookmarksView } from "../../InternalPlugins/Bookmarks/BookmarksView.js";

/**
 * A constructor for a bookmarks view.
 *
 * @public
 */
export type BookmarksViewConstructor = new (
    leaf: WorkspaceLeaf,
    bookmarksPluginInstance: BookmarksPluginInstance
) => BookmarksView;
