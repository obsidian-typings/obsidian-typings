import type {
    App,
    Debouncer,
    Editor,
    Events,
    FileView,
    MarkdownFileInfo,
    MarkdownView,
    Menu,
    PaneType,
    TAbstractFile,
    TFile,
    View,
    WorkspaceLeaf,
    WorkspaceTabs
} from 'obsidian';
import type { TypedWorkspaceLeaf } from '../../TypedWorkspaceLeaf.d.ts';
import type { SearchView } from '../global-search/SearchView.d.ts';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { BookmarkItem } from './bookmark-items/BookmarkItem.d.ts';
import type { BookmarksPlugin } from './BookmarksPlugin.d.ts';

/**
 * Plugin instance for bookmarks, managing bookmarked files, folders, URLs, searches, and graphs.
 * @public
 * @unofficial
 */
export interface BookmarksPluginInstance extends InternalPluginInstance<BookmarksPlugin>, Events {
    /**
     * Internal handler called when bookmark items change.
     *
     * @param shouldSave - Whether to persist changes to storage.
     */
    _onItemsChanged(shouldSave: boolean): void;

    /**
     * Add a bookmark item, optionally to a specific parent instance.
     *
     * @param item - The bookmark item to add.
     * @param instance - Optional parent plugin instance for group placement.
     */
    addItem(item: BookmarkItem, instance?: BookmarksPluginInstance): void;

    /** Reference to the app. */
    app: App;

    /** Weak map tracking bookmarked views and their indicator elements. */
    bookmarkedViews: WeakMap<View, HTMLElement>;

    /** Lookup table mapping paths to bookmark items. */
    bookmarkLookup: Record<string, BookmarkItem>;

    /** Whether this plugin is enabled by default. */
    defaultOn: true;

    /**
     * Open the edit dialog for a bookmark item.
     *
     * @param item - The bookmark item to edit.
     */
    editItem(item: BookmarkItem): void;

    /**
     * Find the bookmark item associated with a given file view.
     *
     * @param view - The file view to find the bookmark for.
     * @returns The matching bookmark item, or `null`/`undefined` if not found.
     */
    findBookmarkByView(view: FileView): BookmarkItem | null | undefined;

    /**
     * Get a flat list of all bookmark items.
     *
     * @returns All bookmark items.
     */
    getBookmarks(): BookmarkItem[];

    /**
     * Get the display title for a bookmark item.
     *
     * @param item - The bookmark item.
     * @returns The display title.
     */
    getItemTitle(item: BookmarkItem): string;

    /** Whether the bookmark data has been successfully loaded and validated. */
    hasValidData: boolean;

    /** Initialize the bookmarks view leaf. */
    initLeaf(): void;

    /** List of all bookmark items. */
    items: BookmarkItem[];

    /**
     * Load bookmark data from storage.
     *
     * @returns Whether the data was loaded successfully.
     */
    loadData(): Promise<boolean>;

    /**
     * Move a bookmark item to a new position within the list.
     *
     * @param item - The bookmark item to move.
     * @param instance - The target parent plugin instance, or `undefined` for root.
     * @param index - The target index position.
     */
    moveItem(item: BookmarkItem, instance: BookmarksPluginInstance | undefined, index: number): void;

    /**
     * Add bookmark-related items to the editor context menu.
     *
     * @param menu - The context menu to extend.
     * @param editor - The active editor.
     * @param info - The active markdown view or file info.
     */
    onEditorMenu(menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo): void;

    /**
     * Called when the plugin is enabled.
     *
     * @param app - The app instance.
     * @param plugin - The bookmarks plugin registration.
     * @returns A promise that resolves when the plugin is enabled.
     */
    onEnable(app: App, plugin: BookmarksPlugin): Promise<void>;

    /**
     * Handle external settings file changes and reload configuration.
     *
     * @returns A promise that resolves when the settings are reloaded.
     */
    onExternalSettingsChange(): Promise<void>;

    /**
     * Add bookmark-related items to a file context menu.
     *
     * @param menu - The context menu to extend.
     * @param files - The files for the context menu.
     * @param source - The source of the context menu event.
     * @param leaf - Optional workspace leaf context.
     */
    onFileMenu(menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf): void;

    /**
     * Handle a file rename and update affected bookmarks.
     *
     * @param file - The renamed file.
     * @param oldPath - The previous file path.
     */
    onFileRename(file: TFile, oldPath: string): void;

    /**
     * Add bookmark-related items to a multi-file context menu.
     *
     * @param menu - The context menu to extend.
     * @param files - The selected files.
     * @param source - The source of the context menu event.
     * @param leaf - Optional workspace leaf context.
     */
    onFilesMenu(menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf): void;

    /** Debounced handler triggered when bookmark items change. */
    onItemsChanged: Debouncer<[boolean], void>;

    /**
     * Add bookmark-related items to a workspace leaf context menu.
     *
     * @param menu - The context menu to extend.
     * @param leaf - The workspace leaf.
     */
    onLeafMenu(menu: Menu, leaf: WorkspaceLeaf): void;

    /**
     * Add bookmark-related items to a search results context menu.
     *
     * @param menu - The context menu to extend.
     * @param search - The search view workspace leaf.
     */
    onSearchResultsMenu(menu: Menu, search: TypedWorkspaceLeaf<SearchView>): void;

    /**
     * Add bookmark-related items to a tab group context menu.
     *
     * @param menu - The context menu to extend.
     * @param tabsLeaf - The workspace tabs container.
     */
    onTabGroupMenu(menu: Menu, tabsLeaf: WorkspaceTabs): void;

    /** Called when the user enables the plugin. */
    onUserEnable(): void;

    /**
     * Open a bookmark item in a new or existing leaf.
     *
     * @param item - The bookmark item to open.
     * @param newLeaf - Where to open the bookmark.
     * @param newLeaf2 - Optional secondary pane type.
     * @returns A promise that resolves when the bookmark is opened.
     */
    openBookmark(item: BookmarkItem, newLeaf: PaneType | boolean, newLeaf2?: PaneType | boolean): Promise<void>;

    /**
     * Open a bookmark item in a specific workspace leaf.
     *
     * @param item - The bookmark item to open.
     * @param leaf - The target workspace leaf.
     * @param newLeaf - Optional pane type override.
     * @returns A promise that resolves when the bookmark is opened in the leaf.
     */
    openBookmarkInLeaf(item: BookmarkItem, leaf: WorkspaceLeaf, newLeaf?: PaneType | boolean): Promise<void>;

    /**
     * Open multiple bookmark items at once.
     *
     * @param items - The bookmark items to open.
     * @param newLeaf - Optional pane type for opening.
     * @returns A promise that resolves when all bookmarks are opened.
     */
    openBookmarks(items: BookmarkItem[], newLeaf?: PaneType | boolean): Promise<void>;

    /** Reference to the bookmarks plugin registration. */
    plugin: BookmarksPlugin;

    /** Rebuild the internal bookmark lookup caches. */
    rebuildBookmarkCache(): void;

    /**
     * Remove a bookmark item from the list.
     *
     * @param item - The bookmark item to remove.
     */
    removeItem(item: BookmarkItem): void;

    /** Persist the current bookmark data to storage. */
    saveData(): void;

    /** Update bookmark indicator icons on tab headers. */
    updateTabHeaders(): void;

    /** Lookup table mapping URLs to bookmark items. */
    urlBookmarkLookup: Record<string, BookmarkItem>;
}
