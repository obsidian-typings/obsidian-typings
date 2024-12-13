import type { App, WorkspaceLeaf } from "obsidian";
import type { BookmarksView } from "../../../internals/InternalPlugins/Bookmarks/BookmarksView.js";
import { ViewType } from "../../Constants/ViewType.ts";
import { getViewConstructorByViewType } from "./getViewConstructorByViewType.ts";
import type { BookmarksPluginInstance } from "../../../internals/InternalPlugins/Bookmarks/BookmarksPluginInstance.js";

/**
 * Get the BookmarksView constructor.
 *
 * @returns The BookmarksView constructor.
 */

export function getBookmarksViewConstructor(app: App): BookmarksViewConstructor {
    return getViewConstructorByViewType(app, ViewType.Bookmarks) as BookmarksViewConstructor;
}

type BookmarksViewConstructor = new (leaf: WorkspaceLeaf, bookmarksPluginInstance: BookmarksPluginInstance) => BookmarksView;
