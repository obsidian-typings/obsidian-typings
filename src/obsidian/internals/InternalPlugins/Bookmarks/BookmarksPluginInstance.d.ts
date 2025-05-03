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
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface BookmarksPluginInstance extends InternalPluginInstance<BookmarksPlugin>, Events {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    bookmarkedViews: WeakMap<View, HTMLElement>;

    /** @todo Documentation incomplete. */
    bookmarkLookup: Record<string, BookmarkItem>;

    /** @todo Documentation incomplete. */
    defaultOn: true;

    /** @todo Documentation incomplete. */
    hasValidData: boolean;

    /** @todo Documentation incomplete. */
    items: BookmarkItem[];

    /** @todo Documentation incomplete. */
    onItemsChanged: Debouncer<[boolean], void>;

    /** @todo Documentation incomplete. */
    plugin: BookmarksPlugin;

    /** @todo Documentation incomplete. */
    urlBookmarkLookup: Record<string, BookmarkItem>;

    /** @todo Documentation incomplete. */
    _onItemsChanged(shouldSave: boolean): void;

    /** @todo Documentation incomplete. */
    addItem(item: BookmarkItem, instance?: BookmarksPluginInstance): void;

    /** @todo Documentation incomplete. */
    editItem(item: BookmarkItem): void;

    /** @todo Documentation incomplete. */
    findBookmarkByView(view: FileView): BookmarkItem | null | undefined;

    /** @todo Documentation incomplete. */
    getBookmarks(): BookmarkItem[];

    /** @todo Documentation incomplete. */
    getItemTitle(item: BookmarkItem): string;

    /** @todo Documentation incomplete. */
    initLeaf(): void;

    /** @todo Documentation incomplete. */
    loadData(): Promise<boolean>;

    /** @todo Documentation incomplete. */
    moveItem(item: BookmarkItem, instance: BookmarksPluginInstance | undefined, index: number): void;

    /** @todo Documentation incomplete. */
    onEditorMenu(menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo): void;

    /** @todo Documentation incomplete. */
    onEnable(app: App, plugin: BookmarksPlugin): Promise<void>;

    /** @todo Documentation incomplete. */
    onExternalSettingsChange(): Promise<void>;

    /** @todo Documentation incomplete. */
    onFileMenu(menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf): void;

    /** @todo Documentation incomplete. */
    onFileRename(file: TFile, oldPath: string): void;

    /** @todo Documentation incomplete. */
    onFilesMenu(menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf): void;

    /** @todo Documentation incomplete. */
    onLeafMenu(menu: Menu, leaf: WorkspaceLeaf): void;

    /** @todo Documentation incomplete. */
    onSearchResultsMenu(menu: Menu, search: TypedWorkspaceLeaf<SearchView>): void;

    /** @todo Documentation incomplete. */
    onTabGroupMenu(menu: Menu, tabsLeaf: WorkspaceTabs): void;

    /** @todo Documentation incomplete. */
    onUserEnable(): void;

    /** @todo Documentation incomplete. */
    openBookmark(item: BookmarkItem, newLeaf: PaneType | boolean, newLeaf2?: PaneType | boolean): Promise<void>;

    /** @todo Documentation incomplete. */
    openBookmarkInLeaf(item: BookmarkItem, leaf: WorkspaceLeaf, newLeaf?: PaneType | boolean): Promise<void>;

    /** @todo Documentation incomplete. */
    openBookmarks(items: BookmarkItem[], newLeaf?: PaneType | boolean): Promise<void>;

    /** @todo Documentation incomplete. */
    rebuildBookmarkCache(): void;

    /** @todo Documentation incomplete. */
    removeItem(item: BookmarkItem): void;

    /** @todo Documentation incomplete. */
    saveData(): void;

    /** @todo Documentation incomplete. */
    updateTabHeaders(): void;
}
