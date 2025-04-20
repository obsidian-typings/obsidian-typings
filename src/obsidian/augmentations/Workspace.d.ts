import type { Extension } from '@codemirror/state';
import type { Constructor } from 'obsidian';
import type { CanvasConnection } from '../internals/CanvasConnection.d.ts';
import type { CanvasNode } from '../internals/CanvasNode.d.ts';
import type { EditorSuggestEx } from '../internals/EditorSuggestEx.d.ts';
import type { GetRecentFilesOptions } from '../internals/GetRecentFilesOptions.d.ts';
import type { HoverLinkEvent } from '../internals/HoverLinkEvent.d.ts';
import type { CanvasView } from '../internals/InternalPlugins/Canvas/CanvasView.d.ts';
import type { SearchView } from '../internals/InternalPlugins/GlobalSearch/SearchView.d.ts';
import type { LeafEntry } from '../internals/LeafEntry.d.ts';
import type { MarkdownScrollableEditView } from '../internals/MarkdownScrollableEditView.d.ts';
import type { ObsidianTouchEvent } from '../internals/ObsidianTouchEvent.d.ts';
import type { RecentFileTracker } from '../internals/RecentFileTracker.d.ts';
import type { StateHistory } from '../internals/StateHistory.d.ts';
import type { TypedWorkspaceLeaf } from '../internals/TypedWorkspaceLeaf.d.ts';
import type { ViewTypeType } from '../internals/Views/ViewTypeType.d.ts';
import type { ViewTypeViewMapping } from '../internals/Views/ViewTypeViewMapping.d.ts';
import type { SerializedWorkspace } from '../internals/Workspace/SerializedWorkspace.d.ts';
import type { WorkspaceHoverLinkSourcesRecord } from '../internals/Workspace/WorkspaceHoverLinkSourcesRecord.d.ts';

declare module 'obsidian' {
    interface Workspace extends Events {
        /**
         * Currently active tab group.
         *
         * @unofficial
         */
        activeTabGroup: WorkspaceTabs;

        /**
         * Reference to App.
         *
         * @unofficial
         */
        app: App;

        /** @unofficial */
        backlinkInDocument?: unknown;

        /**
         * Registered CodeMirror editor extensions, to be applied to all CM instances.
         *
         * @unofficial
         */
        editorExtensions: Extension[];

        /** @unofficial */
        editorSuggest: EditorSuggestEx;

        /** @unofficial */
        floatingSplit: WorkspaceSplit;

        /** @unofficial */
        hoverLinkSources: WorkspaceHoverLinkSourcesRecord;

        /**
         * Last opened file in the vault.
         *
         * @unofficial
         */
        lastActiveFile: TFile;

        /** @unofficial */
        lastTabGroupStacked: boolean;

        /** @unofficial */
        layoutItemQueue: unknown[];

        /**
         * Workspace has finished loading.
         *
         * @unofficial
         */
        layoutReady: boolean;

        /** @unofficial */
        leftSidebarToggleButtonEl: HTMLElement;

        /**
         * Array of renderCallbacks
         *
         * @unofficial
         */
        mobileFileInfos: unknown[];

        /** @unofficial */
        onLayoutReadyCallbacks?: unknown;

        /**
         * Protocol handlers registered on the workspace.
         *
         * @unofficial
         */
        protocolHandlers: Map<string, ObsidianProtocolHandler>;

        /**
         * Tracks last opened files in the vault.
         *
         * @unofficial
         */
        recentFileTracker: RecentFileTracker;

        /** @unofficial */
        rightSidebarToggleButtonEl: HTMLElement;

        /**
         * Keyscope registered to the vault
         *
         * @unofficial
         */
        scope: Scope;

        /**
         * List of states that were closed and may be reopened.
         *
         * @unofficial
         */
        undoHistory: StateHistory[];

        /**
         * Change active leaf and trigger leaf change event
         *
         * @unofficial
         */
        activeLeafEvents(): void;

        /**
         * Add file to mobile file info
         *
         * @unofficial
         */
        addMobileFileInfo(file: unknown): void;

        /**
         * Clear layout of workspace and destruct all leaves
         *
         * @unofficial
         */
        clearLayout(): Promise<void>;

        /**
         * Create a leaf in the selected tab group or last used tab group.
         *
         * @param tabs Tab group to create leaf in.
         * @unofficial
         */
        createLeafInTabGroup(tabs?: WorkspaceTabs): WorkspaceLeaf;

        /**
         * Deserialize workspace entries into actual Leaf objects.
         *
         * @param leaf - Leaf entry to deserialize.
         * @param ribbon - Whether the leaf belongs to the left or right ribbon.
         * @unofficial
         */
        deserializeLayout(leaf: LeafEntry, ribbon?: 'left' | 'right'): Promise<WorkspaceLeaf>;

        /**
         * Reveal leaf in side ribbon with specified view type and state.
         *
         * @param type View type of leaf.
         * @param ribbon Side ribbon to reveal leaf in.
         * @param viewState Open state of leaf.
         * @unofficial
         */
        ensureSideLeaf(type: string, ribbon: 'left' | 'right', viewState: OpenViewState): void;

        /**
         * Get active file view if exists.
         *
         * @unofficial
         */
        getActiveFileView(): FileView | null;

        /**
         * @deprecated - Use `getActiveViewOfType` instead
         * @unofficial
         */
        getActiveLeafOfViewType<T extends View>(type: Constructor<T>): T | null;

        /**
         * Get adjacent leaf in specified direction.
         *
         * @remark Potentially does not work.
         * @unofficial
         */
        getAdjacentLeafInDirection(
            leaf: WorkspaceLeaf,
            direction: 'top' | 'bottom' | 'left' | 'right'
        ): WorkspaceLeaf | null;

        /**
         * Get the direction where the leaf should be dropped on dragevent
         *
         * @unofficial
         */
        getDropDirection(
            e: DragEvent,
            rect: DOMRect,
            directions: ['left', 'right'],
            leaf: WorkspaceLeaf
        ): 'left' | 'right' | 'top' | 'bottom' | 'center';

        /**
         * Get the leaf where the leaf should be dropped on dragevent.
         *
         * @param e Drag event.
         * @unofficial
         */
        getDropLocation(e: DragEvent): WorkspaceLeaf | null;

        /**
         * Get the workspace split for the currently focused container.
         *
         * @unofficial
         */
        getFocusedContainer(): WorkspaceSplit;

        /**
         * Get leaves of a specific view type.
         *
         * @unofficial
         */
        getLeavesOfType<TViewType extends ViewTypeType>(
            viewType: TViewType
        ): TypedWorkspaceLeaf<ViewTypeViewMapping[TViewType]>[];

        /**
         * Get n last opened files of type (defaults to 10).
         *
         * @unofficial
         */
        getRecentFiles(options?: GetRecentFilesOptions): string[];

        /**
         * Get leaf in the side ribbon/dock and split if necessary.
         *
         * @param sideRibbon Side ribbon to get leaf from.
         * @param split Whether to split the leaf if it does not exist.
         * @unofficial
         */
        getSideLeaf(sideRibbon: WorkspaceSidedock | WorkspaceMobileDrawer, split: boolean): WorkspaceLeaf;

        /** @unofficial */
        handleExternalLinkContextMenu(menu: Menu, linkText: string): void;

        /** @unofficial */
        handleLinkContextMenu(menu: Menu, linkText: string, sourcePath: string): void;

        /**
         * Check if leaf has been attached to the workspace
         *
         * @unofficial
         */
        isAttached(leaf?: WorkspaceLeaf): boolean;

        /**
         * Iterate the leaves of a split.
         *
         * @unofficial
         */
        iterateLeaves(split: WorkspaceSplit, callback: (leaf: WorkspaceLeaf) => unknown): void;

        /**
         * Iterate the tabs of a split till meeting a condition.
         *
         * @unofficial
         */
        iterateTabs(tabs: WorkspaceSplit | WorkspaceSplit[], cb: (leaf: WorkspaceLeaf) => boolean): boolean;

        /**
         * Load workspace from disk and initialize
         *
         * @unofficial
         */
        loadLayout(): Promise<void>;

        /**
         * Triggers when the browser history is updated.
         *
         * @param name - 'browser:update-history'.
         * @param callback - Callback function.
         * @param ctx - Context.
         * @returns Event reference.
         * @unofficial
         */
        on(name: 'browser:update-history', callback: () => unknown, ctx?: unknown): EventRef;

        /**
         * Triggers when the user opens a context menu on a connection in the canvas.
         *
         * @unofficial
         */
        on(
            name: 'canvas:edge-menu',
            callback: (menu: Menu, connection: CanvasConnection) => void,
            ctx?: unknown
        ): EventRef;

        /**
         * Triggers when the user drops edge connection to empty space in the canvas.
         *
         * @unofficial
         */
        on(
            name: 'canvas:node-connection-drop-menu',
            callback: (menu: Menu, originalNode: CanvasNode, connection: CanvasConnection) => void,
            ctx?: unknown
        ): EventRef;

        /**
         * Triggers when the user opens a context menu on a single node in the canvas.
         *
         * @unofficial
         */
        on(name: 'canvas:node-menu', callback: (menu: Menu, node: CanvasNode) => void, ctx?: unknown): EventRef;

        /**
         * Triggers when the user opens a context menu on a selection of multiple nodes in the canvas.
         *
         * @unofficial
         */
        on(
            name: 'canvas:selection-menu',
            callback: (menu: Menu, canvasView: CanvasView) => void,
            ctx?: unknown
        ): EventRef;

        /**
         * Triggers when the editor selection changes.
         *
         * @param name - 'editor-selection-change'.
         * @param callback - Callback function.
         * @param ctx - Context.
         * @returns Event reference.
         * @unofficial
         */
        on(
            name: 'editor-selection-change',
            callback: (editor: Editor, info: MarkdownView | MarkdownFileInfo) => unknown,
            ctx?: unknown
        ): EventRef;

        /**
         * Triggers when user hovers over any note link element (file explorer, editor, ...).
         *
         * @remark Used for preparing (Ctrl) hover previews.
         * @unofficial
         */
        on(name: 'hover-link', callback: (event: HoverLinkEvent) => void, ctx?: unknown): EventRef;

        /**
         * Triggers when workspace layout is loaded.
         *
         * @remark Prefer usage of onLayoutReady instead.
         * @unofficial
         */
        on(name: 'layout-ready', callback: () => void, ctx?: unknown): EventRef;

        /**
         * Triggers when the leaf menu is opened.
         *
         * @param name - 'leaf-menu'.
         * @param callback - Callback function.
         * @param ctx - Context.
         * @returns Event reference.
         * @unofficial
         */
        on(name: 'leaf-menu', callback: (menu: Menu, leaf: WorkspaceLeaf) => unknown, ctx?: unknown): EventRef;

        /**
         * Triggers when the markdown scroll event is fired.
         *
         * @param name - 'markdown-scroll'.
         * @param callback - Callback function.
         * @param ctx - Context.
         * @returns Event reference.
         * @unofficial
         */
        on(name: 'markdown-scroll', callback: (view: MarkdownScrollableEditView) => unknown, ctx?: unknown): EventRef;

        /**
         * Triggers when the markdown viewport menu is opened.
         *
         * @param name - 'markdown-viewport-menu'.
         * @param callback - Callback function.
         * @param ctx - Context.
         * @returns Event reference.
         * @unofficial
         */
        on(
            name: 'markdown-viewport-menu',
            callback: (menu: Menu, view: MarkdownPreviewView, sectionName: string, menuItem: string) => unknown,
            ctx?: unknown
        ): EventRef;

        /**
         * Called when user shares files on mobile
         *
         * @unofficial
         */
        on(name: 'receive-files-menu', callback: (menu: Menu, x: unknown) => void, ctx?: unknown): EventRef;

        /**
         * Called when user shares text on mobile
         *
         * @unofficial
         */
        on(name: 'receive-text-menu', callback: (menu: Menu, x: unknown) => void, ctx?: unknown): EventRef;

        /**
         * Triggers when user clicks on 'N results' button in search view.
         *
         * @unofficial
         */
        on(
            name: 'search:results-menu',
            callback: (menu: Menu, search: TypedWorkspaceLeaf<SearchView>) => void,
            ctx?: unknown
        ): EventRef;

        /**
         * Triggers when user swipes open left/right sidebar
         *
         * @unofficial
         */
        on(name: 'swipe', callback: (touchEvents: ObsidianTouchEvent[]) => void, ctx?: unknown): EventRef;

        /**
         * Called whenever user opens tab group menu (contains e.g. stacked tabs button)
         *
         * @unofficial
         */
        on(name: 'tab-group-menu', callback: (tabMenu: Menu, tabsLeaf: WorkspaceTabs) => void, ctx?: unknown): EventRef;

        /**
         * Triggers when user right-clicks on external URL in editor
         *
         * @unofficial
         */
        on(name: 'url-menu', callback: (menu: Menu, url: string) => void, ctx?: unknown): EventRef;

        /**
         * Handles drag event on leaf
         *
         * @unofficial
         */
        onDragLeaf(e: DragEvent, leaf: WorkspaceLeaf): void;

        /**
         * Handles layout change and saves layout to disk
         *
         * @unofficial
         */
        onLayoutChange(leaf?: WorkspaceLeaf): void;

        /** @unofficial */
        onLinkContextMenu(args: unknown[]): void;

        /** @unofficial */
        onQuickPreview(args: unknown[]): void;

        /** @unofficial */
        onResize(): void;

        /** @unofficial */
        onStartLink(leaf: WorkspaceLeaf): void;

        /**
         * Open a leaf in a popup window.
         *
         * @remark Prefer usage of `app.workspace.openPopoutLeaf`.
         * @unofficial
         */
        openPopout(data?: WorkspaceWindowInitData): WorkspaceWindow;

        /**
         * Push leaf change to history
         *
         * @unofficial
         */
        pushUndoHistory(leaf: WorkspaceLeaf, parentID: string, rootID: string): void;

        /**
         * Get drag event target location
         *
         * @unofficial
         */
        recursiveGetTarget(e: DragEvent, leaf: WorkspaceLeaf): WorkspaceTabs | null;

        /**
         * Register a CodeMirror editor extension.
         *
         * @remark Prefer registering the extension via the Plugin class.
         * @unofficial
         */
        registerEditorExtension(extension: Extension): void;

        /**
         * Registers hover link source
         *
         * @unofficial
         */
        registerHoverLinkSource(key: string, source: HoverLinkSource): void;

        /**
         * Registers Obsidian protocol handler
         *
         * @unofficial
         */
        registerObsidianProtocolHandler(protocol: string, handler: ObsidianProtocolHandler): void;

        /**
         * Constructs hook for receiving URI actions
         *
         * @unofficial
         */
        registerUriHook(): void;

        /**
         * Request execution of activeLeaf change events
         *
         * @unofficial
         */
        requestActiveLeafEvents(): void;

        /**
         * Request execution of resize event
         *
         * @unofficial
         */
        requestResize(): void;

        /**
         * Request execution of layout update event
         *
         * @unofficial
         */
        requestUpdateLayout(): void;

        /**
         * Save workspace layout to disk.
         *
         * @unofficial
         */
        saveLayout(): Promise<void>;

        /**
         * Use deserialized layout data to reconstruct the workspace
         *
         * @unofficial
         */
        setLayout(data: SerializedWorkspace): Promise<void>;

        /**
         * Split leaves in specified direction
         *
         * @unofficial
         */
        splitLeaf(leaf: WorkspaceLeaf, newLeaf: WorkspaceLeaf, direction?: SplitDirection, before?: boolean): void;

        /**
         * Split provided leaf, or active leaf if none provided.
         *
         * @unofficial
         */
        splitLeafOrActive(leaf?: WorkspaceLeaf, direction?: SplitDirection): WorkspaceLeaf;

        /**
         * Unregister a CodeMirror editor extension
         *
         * @unofficial
         */
        unregisterEditorExtension(extension: Extension): void;

        /**
         * Unregister hover link source
         *
         * @unofficial
         */
        unregisterHoverLinkSource(key: string): void;

        /**
         * Unregister Obsidian protocol handler
         *
         * @unofficial
         */
        unregisterObsidianProtocolHandler(protocol: string): void;

        /** @unofficial */
        updateFrameless(): void;

        /**
         * Invoke workspace layout update, redraw and save
         *
         * @unofficial
         */
        updateLayout(): void;

        /**
         * Update visibility of tab group
         *
         * @unofficial
         */
        updateMobileVisibleTabGroup(): void;

        /**
         * Update the internal title of the application.
         *
         * @remark This title is shown as the application title in the OS taskbar.
         * @unofficial
         */
        updateTitle(): void;
    }
}
