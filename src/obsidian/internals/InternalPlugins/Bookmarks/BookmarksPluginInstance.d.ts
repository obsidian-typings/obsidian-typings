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
import type { SearchView } from '../GlobalSearch/SearchView.d.ts';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { BookmarkItem } from './BookmarkItems/BookmarkItem.d.ts';
import type { BookmarksPlugin } from './BookmarksPlugin.d.ts';

/**
 * Plugin instance for bookmarks, managing bookmarked files, folders, URLs, searches, and graphs.
 * @public
 * @unofficial
 */
export interface BookmarksPluginInstance extends InternalPluginInstance<BookmarksPlugin>, Events {
    /** Reference to the app. */
    app: App;

    /** Weak map tracking bookmarked views and their indicator elements. */
    bookmarkedViews: WeakMap<View, HTMLElement>;

    /** Lookup table mapping paths to bookmark items. */
    bookmarkLookup: Record<string, BookmarkItem>;

    /** Whether this plugin is enabled by default. */
    defaultOn: true;

    /** Whether the bookmark data has been successfully loaded and validated. */
    hasValidData: boolean;

    /** List of all bookmark items. */
    items: BookmarkItem[];

    /** Debounced handler triggered when bookmark items change. */
    onItemsChanged: Debouncer<[boolean], void>;

    /** Reference to the bookmarks plugin registration. */
    plugin: BookmarksPlugin;

    /** Lookup table mapping URLs to bookmark items. */
    urlBookmarkLookup: Record<string, BookmarkItem>;

    /** Internal handler called when bookmark items change. */
    _onItemsChanged(shouldSave: boolean): void;

    /** Add a bookmark item, optionally to a specific parent instance. */
    addItem(item: BookmarkItem, instance?: BookmarksPluginInstance): void;

    /** Open the edit dialog for a bookmark item. */
    editItem(item: BookmarkItem): void;

    /** Find the bookmark item associated with a given file view. */
    findBookmarkByView(view: FileView): BookmarkItem | null | undefined;

    /** Get a flat list of all bookmark items. */
    getBookmarks(): BookmarkItem[];

    /** Get the display title for a bookmark item. */
    getItemTitle(item: BookmarkItem): string;

    /** Initialize the bookmarks view leaf. */
    initLeaf(): void;

    /** Load bookmark data from storage. */
    loadData(): Promise<boolean>;

    /** Move a bookmark item to a new position within the list. */
    moveItem(item: BookmarkItem, instance: BookmarksPluginInstance | undefined, index: number): void;

    /** Add bookmark-related items to the editor context menu. */
    onEditorMenu(menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo): void;

    /** Called when the plugin is enabled. */
    onEnable(app: App, plugin: BookmarksPlugin): Promise<void>;

    /** Handle external settings file changes and reload configuration. */
    onExternalSettingsChange(): Promise<void>;

    /** Add bookmark-related items to a file context menu. */
    onFileMenu(menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf): void;

    /** Handle a file rename and update affected bookmarks. */
    onFileRename(file: TFile, oldPath: string): void;

    /** Add bookmark-related items to a multi-file context menu. */
    onFilesMenu(menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf): void;

    /** Add bookmark-related items to a workspace leaf context menu. */
    onLeafMenu(menu: Menu, leaf: WorkspaceLeaf): void;

    /** Add bookmark-related items to a search results context menu. */
    onSearchResultsMenu(menu: Menu, search: TypedWorkspaceLeaf<SearchView>): void;

    /** Add bookmark-related items to a tab group context menu. */
    onTabGroupMenu(menu: Menu, tabsLeaf: WorkspaceTabs): void;

    /** Called when the user enables the plugin. */
    onUserEnable(): void;

    /** Open a bookmark item in a new or existing leaf. */
    openBookmark(item: BookmarkItem, newLeaf: PaneType | boolean, newLeaf2?: PaneType | boolean): Promise<void>;

    /** Open a bookmark item in a specific workspace leaf. */
    openBookmarkInLeaf(item: BookmarkItem, leaf: WorkspaceLeaf, newLeaf?: PaneType | boolean): Promise<void>;

    /** Open multiple bookmark items at once. */
    openBookmarks(items: BookmarkItem[], newLeaf?: PaneType | boolean): Promise<void>;

    /** Rebuild the internal bookmark lookup caches. */
    rebuildBookmarkCache(): void;

    /** Remove a bookmark item from the list. */
    removeItem(item: BookmarkItem): void;

    /** Persist the current bookmark data to storage. */
    saveData(): void;

    /** Update bookmark indicator icons on tab headers. */
    updateTabHeaders(): void;
}
