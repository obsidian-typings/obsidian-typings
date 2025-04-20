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
 * @public
 * @unofficial
 */
export interface BookmarksPluginInstance extends InternalPluginInstance<BookmarksPlugin>, Events {
    app: App;
    bookmarkedViews: WeakMap<View, HTMLElement>;
    bookmarkLookup: Record<string, BookmarkItem>;
    defaultOn: true;
    hasValidData: boolean;
    items: BookmarkItem[];
    onItemsChanged: Debouncer<[boolean], void>;
    plugin: BookmarksPlugin;
    urlBookmarkLookup: Record<string, BookmarkItem>;

    _onItemsChanged(shouldSave: boolean): void;
    addItem(item: BookmarkItem, instance?: BookmarksPluginInstance): void;
    editItem(item: BookmarkItem): void;
    findBookmarkByView(view: FileView): BookmarkItem | null | undefined;
    getBookmarks(): BookmarkItem[];
    getItemTitle(item: BookmarkItem): string;
    initLeaf(): void;
    loadData(): Promise<boolean>;
    moveItem(item: BookmarkItem, instance: BookmarksPluginInstance | undefined, index: number): void;
    onEditorMenu(menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo): void;
    onEnable(app: App, plugin: BookmarksPlugin): Promise<void>;
    onExternalSettingsChange(): Promise<void>;
    onFileMenu(menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf): void;
    onFileRename(file: TFile, oldPath: string): void;
    onFilesMenu(menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf): void;
    onLeafMenu(menu: Menu, leaf: WorkspaceLeaf): void;
    onSearchResultsMenu(menu: Menu, search: TypedWorkspaceLeaf<SearchView>): void;
    onTabGroupMenu(menu: Menu, tabsLeaf: WorkspaceTabs): void;
    onUserEnable(): void;
    openBookmark(item: BookmarkItem, newLeaf: PaneType | boolean, newLeaf2?: PaneType | boolean): Promise<void>;
    openBookmarkInLeaf(item: BookmarkItem, leaf: WorkspaceLeaf, newLeaf?: PaneType | boolean): Promise<void>;
    openBookmarks(items: BookmarkItem[], newLeaf?: PaneType | boolean): Promise<void>;
    rebuildBookmarkCache(): void;
    removeItem(item: BookmarkItem): void;
    saveData(): void;
    updateTabHeaders(): void;
}
