import type {
    App,
    Debouncer,
    Editor,
    Events,
    FileView,
    MarkdownFileInfo,
    MarkdownView,
    Menu,
    TAbstractFile,
    TFile,
    WorkspaceLeaf
} from 'obsidian';
import type { BookmarkItem } from './BookmarkItem.js';
import type { BookmarksPlugin } from './BookmarksPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface BookmarksPluginInstance extends InternalPluginInstance<BookmarksPlugin>, Events {
    app: App;
    bookmarkedViews: WeakMap<object, unknown>;
    bookmarkLookup: Record<string, unknown>;
    defaultOn: boolean;
    hasValidData: boolean;
    items: BookmarkItem[];
    onItemsChanged: Debouncer<[boolean], unknown>;
    plugin: BookmarksPlugin;
    urlBookmarkLookup: Record<string, unknown>;

    _onItemsChanged(arg1: boolean): void;
    addItem(item: BookmarkItem, instance: BookmarksPluginInstance): void;
    constructor(): unknown;
    editItem(item: BookmarkItem): void;
    findBookmarkByView(view: FileView): unknown;
    getBookmarks(): BookmarkItem[];
    getItemTitle(item: BookmarkItem): string;
    initLeaf(): void;
    loadData(): Promise<boolean>;
    moveItem(item: BookmarkItem, instance: BookmarksPluginInstance, arg3: number): void;
    onEditorMenu(menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo): void;
    onEnable(app: App, plugin: BookmarksPlugin): Promise<void>;
    onExternalSettingsChange(): Promise<void>;
    onFileMenu(menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf): void;
    onFileRename(file: TFile, oldPath: string): void;
    onFilesMenu(menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf): void;
    onLeafMenu(arg1: unknown, arg2: unknown): unknown;
    onSearchResultsMenu(arg1: unknown, arg2: unknown): unknown;
    onTabGroupMenu(menu: Menu, arg2: unknown): unknown;
    onUserEnable(): void;
    openBookmark(arg1: unknown, arg2: unknown, arg3: unknown): Promise<unknown>;
    openBookmarkInLeaf(arg1: unknown, arg2: unknown, arg3: unknown): Promise<unknown>;
    openBookmarks(arg1: unknown, arg2: unknown): Promise<unknown>;
    rebuildBookmarkCache(): unknown;
    removeItem(item: BookmarkItem): void;
    saveData(): unknown;
    updateTabHeaders(): void;
}
