import type { Extension } from '@codemirror/state';
import type { Constructor } from 'obsidian';
import type { CanvasConnection } from '../internals/CanvasConnection.d.ts';
import type { CanvasNode } from '../internals/CanvasNode.d.ts';
import type { EditorSuggestEx } from '../internals/EditorSuggestEx.d.ts';
import type { EnsureSideLeafOptions } from '../internals/EnsureSideLeafOptions.d.ts';
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
    /**
     * A workspace.
     */
    interface Workspace extends Events {
        /**
         * A component managing the current editor.
         * This can be `null` if the active view has no editor.
         *
         * @official
         */
        activeEditor: MarkdownFileInfo | null;

        /**
         * Indicates the currently focused leaf, if one exists.
         *
         * Please avoid using `activeLeaf` directly, especially without checking whether
         * `activeLeaf` is null.
         *
         * @deprecated The use of this field is discouraged.
         * The recommended alternatives are:
         * - If you need information about the current view, use {@link Workspace.getActiveViewOfType}.
         * - If you need to open a new file or navigate a view, use {@link Workspace.getLeaf}.
         * @official
         */
        activeLeaf: WorkspaceLeaf | null;

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

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        backlinkInDocument?: unknown;

        /**
         * The container element of the workspace.
         *
         * @official
         */
        containerEl: HTMLElement;

        /**
         * Registered CodeMirror editor extensions, to be applied to all CM instances.
         *
         * @unofficial
         */
        editorExtensions: Extension[];

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        editorSuggest: EditorSuggestEx;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        floatingSplit: WorkspaceSplit;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        hoverLinkSources: WorkspaceHoverLinkSourcesRecord;

        /**
         * Last opened file in the vault.
         *
         * @unofficial
         */
        lastActiveFile: TFile;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        lastTabGroupStacked: boolean;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        layoutItemQueue: unknown[];

        /**
         * Whether the layout of the app has been successfully initialized.
         * To react to the layout becoming ready, use {@link Workspace.onLayoutReady}
         *
         * @official
         */
        layoutReady: boolean;

        /**
         * The left ribbon of the workspace.
         *
         * @official
         */
        leftRibbon: WorkspaceRibbon;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        leftSidebarToggleButtonEl: HTMLElement;

        /**
         * The left split of the workspace.
         *
         * @official
         */
        leftSplit: WorkspaceSidedock | WorkspaceMobileDrawer;

        /**
         * Array of renderCallbacks
         *
         * @unofficial
         */
        mobileFileInfos: unknown[];

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
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

        /**
         * Save the state of the current workspace layout.
         *
         * @official
         */
        requestSaveLayout: Debouncer<[], Promise<void>>;

        /**
         * The right ribbon of the workspace.
         *
         * @deprecated No longer used
         * @official
         */
        rightRibbon: WorkspaceRibbon;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        rightSidebarToggleButtonEl: HTMLElement;

        /**
         * The right split of the workspace.
         *
         * @official
         */
        rightSplit: WorkspaceSidedock | WorkspaceMobileDrawer;

        /**
         * The root split of the workspace.
         *
         * @official
         */
        rootSplit: WorkspaceRoot;

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
         * Change the layout of the workspace.
         *
         * @param workspace - The workspace to change the layout to.
         * @returns A promise that resolves when the layout is changed.
         * @official
         */
        changeLayout(workspace: any): Promise<void>;

        /**
         * Clear layout of workspace and destruct all leaves
         *
         * @unofficial
         */
        clearLayout(): Promise<void>;

        /**
         * Create a leaf by a split.
         *
         * @param leaf - The leaf to create the leaf by.
         * @param direction - The direction to create the leaf in.
         * @param before - Whether to create the leaf before the current leaf.
         * @returns The leaf that was created.
         * @official
         */
        createLeafBySplit(leaf: WorkspaceLeaf, direction?: SplitDirection, before?: boolean): WorkspaceLeaf;

        /**
         * Create a leaf in a parent.
         *
         * @param parent - The parent to create the leaf in.
         * @param index - The index to create the leaf in.
         * @returns The leaf that was created.
         * @official
         */
        createLeafInParent(parent: WorkspaceSplit, index: number): WorkspaceLeaf;

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
         * Remove all leaves of the given type.
         *
         * @param viewType - The type of the view to remove.
         * @official
         */
        detachLeavesOfType(viewType: string): void;

        /**
         * Duplicate a leaf.
         *
         * @param leaf - The leaf to duplicate.
         * @param direction - The direction to duplicate the leaf in.
         * @returns The promise that resolves to the leaf that was created.
         * @deprecated - Use the new form of this method instead
         * @official
         */
        duplicateLeaf(leaf: WorkspaceLeaf, direction?: SplitDirection): Promise<WorkspaceLeaf>;

        /**
         * Duplicate a leaf.
         *
         * @param leaf - The leaf to duplicate.
         * @param leafType - The type of the leaf to duplicate.
         * @param direction - The direction to duplicate the leaf in.
         * @returns The promise that resolves to the leaf that was created.
         * @official
         */
        duplicateLeaf(
            leaf: WorkspaceLeaf,
            leafType: PaneType | boolean,
            direction?: SplitDirection
        ): Promise<WorkspaceLeaf>;

        /**
         * Get side leaf or create one if one does not exist.
         *
         * @param type - The type of the leaf to get or create.
         * @param side - The side of the leaf to get or create.
         * @param options - The options to pass to the leaf.
         * @returns The promise that is resolved to the leaf that was created.
         * @official - Changed signature.
         */
        ensureSideLeaf(type: string, side: Side, options?: EnsureSideLeafOptions): Promise<WorkspaceLeaf>;

        /**
         * Returns the file for the current view if it's a `FileView`.
         * Otherwise, it will return the most recently active file.
         *
         * @returns The active file or `null` if no file is active.
         * @official
         */
        getActiveFile(): TFile | null;

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
         * Get the currently active view of a given type.
         *
         * @param type - The type of the view to get.
         * @returns The active view of the given type or `null` if no view of the given type is active.
         * @official
         */
        getActiveViewOfType<T extends View>(type: Constructor<T>): T | null;

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
         * Get all leaves that belong to a group.
         *
         * @param group - The id of the group to get the leaves from.
         * @returns The leaves that belong to the group.
         * @official
         */
        getGroupLeaves(group: string): WorkspaceLeaf[];

        /**
         * Get the filenames of the 10 most recently opened files.
         *
         * @returns The filenames of the 10 most recently opened files.
         * @official
         */
        getLastOpenFiles(): string[];

        /**
         * Get the layout of the workspace.
         *
         * @returns The layout of the workspace.
         * @official
         */
        getLayout(): Record<string, unknown>;

        /**
         * Creates a new leaf in a leaf adjacent to the currently active leaf.
         * If direction is `'vertical'`, the leaf will appear to the right.
         * If direction is `'horizontal'`, the leaf will appear below the current leaf.
         *
         * @official
         */
        getLeaf(newLeaf?: 'split', direction?: SplitDirection): WorkspaceLeaf;

        /**
         * If newLeaf is `false` (or not set) then an existing leaf which can be navigated.
         * is returned, or a new leaf will be created if there was no leaf available.
         *
         * If newLeaf is `'tab'` or `true` then a new leaf will be created in the preferred
         * location within the root split and returned.
         *
         * If newLeaf is `'split'` then a new leaf will be created adjacent to the currently active leaf.
         *
         * If newLeaf is `'window'` then a popout window will be created with a new leaf inside.
         *
         * @param newLeaf - The type of the leaf to get or `true` to create a new leaf or `false` to get an existing leaf.
         * @returns The leaf that was created.
         * @official
         */
        getLeaf(newLeaf?: PaneType | boolean): WorkspaceLeaf;

        /**
         * Retrieve a leaf by its id.
         *
         * @param id id of the leaf to retrieve.
         * @returns The leaf that was retrieved.
         * @official
         */
        getLeafById(id: string): WorkspaceLeaf | null;

        /**
         * Get all leaves of a given type.
         *
         * @param viewType - The type of the view to get.
         * @returns The leaves of the given type.
         * @official
         */
        getLeavesOfType(viewType: string): WorkspaceLeaf[];

        /**
         * Get leaves of a specific view type.
         *
         * @unofficial
         */
        getLeavesOfType<TViewType extends ViewTypeType>(
            viewType: TViewType
        ): TypedWorkspaceLeaf<ViewTypeViewMapping[TViewType]>[];

        /**
         * Create a new leaf inside the left sidebar.
         *
         * @param split - Should the existing split be split up?.
         * @returns The leaf that was created or `null` if the left sidebar is not open.
         * @official
         */
        getLeftLeaf(split: boolean): WorkspaceLeaf | null;

        /**
         * Get the most recently active leaf in a given workspace root. Useful for interacting with the leaf in the root split while a sidebar leaf might be active.
         *
         * @param root - The root to get the most recently active leaf from. If a root is not provided, the `rootSplit` and leaves within pop-outs will be searched.
         * @returns The most recently active leaf.
         * @official
         */
        getMostRecentLeaf(root?: WorkspaceParent): WorkspaceLeaf | null;

        /**
         * Get n last opened files of type (defaults to 10).
         *
         * @unofficial
         */
        getRecentFiles(options?: GetRecentFilesOptions): string[];

        /**
         * Create a new leaf inside the right sidebar.
         *
         * @param split - Should the existing split be split up?.
         * @returns The leaf that was created or `null` if the right sidebar is not open.
         * @official
         */
        getRightLeaf(split: boolean): WorkspaceLeaf | null;

        /**
         * Get leaf in the side ribbon/dock and split if necessary.
         *
         * @param sideRibbon Side ribbon to get leaf from.
         * @param split Whether to split the leaf if it does not exist.
         * @unofficial
         */
        getSideLeaf(sideRibbon: WorkspaceSidedock | WorkspaceMobileDrawer, split: boolean): WorkspaceLeaf;

        /**
         * Get the unpinned leaf.
         *
         * @returns The unpinned leaf.
         * @deprecated - You should use {@link Workspace.getLeaf|getLeaf(false)} instead which does the same thing.
         * @official
         */
        getUnpinnedLeaf(): WorkspaceLeaf;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        handleExternalLinkContextMenu(menu: Menu, linkText: string): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        handleLinkContextMenu(menu: Menu, linkText: string, sourcePath: string): void;

        /**
         * Check if leaf has been attached to the workspace
         *
         * @unofficial
         */
        isAttached(leaf?: WorkspaceLeaf): boolean;

        /**
         * Iterate through all leaves, including main area leaves, floating leaves, and sidebar leaves.
         *
         * @param callback - The callback to call for each leaf.
         * @official
         */
        iterateAllLeaves(callback: (leaf: WorkspaceLeaf) => any): void;

        /**
         * Iterate the leaves of a split.
         *
         * @unofficial
         */
        iterateLeaves(split: WorkspaceSplit, callback: (leaf: WorkspaceLeaf) => unknown): void;

        /**
         * Iterate through all leaves in the main area of the workspace.
         *
         * @param callback - The callback to call for each leaf.
         * @official
         */
        iterateRootLeaves(callback: (leaf: WorkspaceLeaf) => any): void;

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
         * Migrates this leaf to a new popout window.
         * Only works on the desktop app.
         *
         * @param leaf - The leaf to migrate to a popout window.
         * @param data - The data to pass to the popout window.
         * @returns The popout window that was created.
         * @throws Error if the app does not support popout windows (i.e. on mobile or if Electron version is too old).
         * @official
         */
        moveLeafToPopout(leaf: WorkspaceLeaf, data?: WorkspaceWindowInitData): WorkspaceWindow;

        /**
         * Triggered when the active leaf changes.
         *
         * @param name - Should be `'active-leaf-change'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('active-leaf-change', (leaf) => {
         *     console.log(leaf);
         * });
         * ```
         * @official
         */
        on(name: 'active-leaf-change', callback: (leaf: WorkspaceLeaf | null) => any, ctx?: any): EventRef;

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
         * Triggered when the CSS of the app has changed.
         *
         * @param name - Should be `'css-change'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('css-change', () => {
         *     console.log('css-change');
         * });
         * @official
         */
        on(name: 'css-change', callback: () => any, ctx?: any): EventRef;

        /**
         * Triggered when changes to an editor has been applied, either programmatically or from a user event.
         *
         * @param name - Should be `'editor-change'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('editor-change', (editor, info) => {
         *     console.log(editor, info);
         * });
         * ```
         * @official
         */
        on(
            name: 'editor-change',
            callback: (editor: Editor, info: MarkdownView | MarkdownFileInfo) => any,
            ctx?: any
        ): EventRef;

        /**
         * Triggered when the editor receives a drop event.
         * Check for `evt.defaultPrevented` before attempting to handle this event, and return if it has been already handled.
         * Use `evt.preventDefault()` to indicate that you've handled the event.
         *
         * @param name - Should be `'editor-drop'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('editor-drop', (evt, editor, info) => {
         *     console.log(evt, editor, info);
         * });
         * ```
         * @official
         */
        on(
            name: 'editor-drop',
            callback: (evt: DragEvent, editor: Editor, info: MarkdownView | MarkdownFileInfo) => any,
            ctx?: any
        ): EventRef;

        /**
         * Triggered when the user opens the context menu on an editor.
         *
         * @param name - Should be `'editor-menu'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('editor-menu', (menu, editor, info) => {
         *     console.log(menu, editor, info);
         * });
         * ```
         * @official
         */
        on(
            name: 'editor-menu',
            callback: (menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo) => any,
            ctx?: any
        ): EventRef;

        /**
         * Triggered when the editor receives a paste event.
         * Check for `evt.defaultPrevented` before attempting to handle this event, and return if it has been already handled.
         * Use `evt.preventDefault()` to indicate that you've handled the event.
         *
         * @param name - Should be `'editor-paste'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('editor-paste', (evt, editor, info) => {
         *     console.log(evt, editor, info);
         * });
         * ```
         * @official
         */
        on(
            name: 'editor-paste',
            callback: (evt: ClipboardEvent, editor: Editor, info: MarkdownView | MarkdownFileInfo) => any,
            ctx?: any
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
         * Triggered when the user opens the context menu on a file.
         *
         * @param name - Should be `'file-menu'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('file-menu', (menu, file, source, leaf) => {
         *     console.log(menu, file, source, leaf);
         * });
         * ```
         * @official
         */
        on(
            name: 'file-menu',
            callback: (menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf) => any,
            ctx?: any
        ): EventRef;

        /**
         * Triggered when the active file changes. The file could be in a new leaf, an existing leaf,.
         * or an embed.
         *
         * @param name - Should be `'file-open'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('file-open', (file) => {
         *     console.log(file);
         * });
         * ```
         * @official
         */
        on(name: 'file-open', callback: (file: TFile | null) => any, ctx?: any): EventRef;

        /**
         * Triggered when the user opens the context menu with multiple files selected in the File Explorer.
         *
         * @param name - Should be `'files-menu'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('files-menu', (menu, files, source, leaf) => {
         *     console.log(menu, files, source, leaf);
         * });
         * ```
         * @official
         */
        on(
            name: 'files-menu',
            callback: (menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf) => any,
            ctx?: any
        ): EventRef;

        /**
         * Triggers when user hovers over any note link element (file explorer, editor, ...).
         *
         * @remark Used for preparing (Ctrl) hover previews.
         * @unofficial
         */
        on(name: 'hover-link', callback: (event: HoverLinkEvent) => void, ctx?: unknown): EventRef;

        /**
         * Triggered when the layout of the workspace changes.
         *
         * @param name - Should be `'layout-change'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('layout-change', () => {
         *     console.log('layout-change');
         * });
         * ```
         * @official
         */
        on(name: 'layout-change', callback: () => any, ctx?: any): EventRef;

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
            callback: (menu: Menu, view: MarkdownView, sectionName: string, menuItem: string) => unknown,
            ctx?: unknown
        ): EventRef;

        /**
         * Triggered when the active Markdown file is modified. React to file changes before they.
         * are saved to disk.
         *
         * @param name - Should be `'quick-preview'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('quick-preview', (file, data) => {
         *     console.log(file, data);
         * });
         * ```
         * @official
         */
        on(name: 'quick-preview', callback: (file: TFile, data: string) => any, ctx?: any): EventRef;

        /**
         * Triggered when the app is about to quit.
         * Not guaranteed to actually run.
         * Perform some best effort cleanup here.
         *
         * @param name - Should be `'quit'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('quit', (tasks: Tasks) => {
         *     console.log(tasks);
         * });
         * ```
         * @official
         */
        on(name: 'quit', callback: (tasks: Tasks) => any, ctx?: any): EventRef;

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
         * Triggered when a `WorkspaceItem` is resized or the workspace layout has changed.
         *
         * @param name - Should be `'resize'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('resize', () => {
         *     console.log('resize');
         * });
         * ```
         * @official
         */
        on(name: 'resize', callback: () => any, ctx?: any): EventRef;

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
         * Triggered when the user opens the context menu on an external URL.
         *
         * @param name - Should be `'url-menu'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('url-menu', (menu, url) => {
         *     console.log(menu, url);
         * });
         * ```
         * @official
         */
        on(name: 'url-menu', callback: (menu: Menu, url: string) => any, ctx?: any): EventRef;

        /**
         * Triggered when a popout window is closed.
         *
         * @param name - Should be `'window-close'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('window-close', (win, window) => {
         *     console.log(win, window);
         * });
         * ```
         * @official
         */
        on(name: 'window-close', callback: (win: WorkspaceWindow, window: Window) => any, ctx?: any): EventRef;

        /**
         * Triggered when a new popout window is created.
         *
         * @param name - Should be `'window-open'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * app.workspace.on('window-open', (win, window) => {
         *     console.log(win, window);
         * });
         * @official
         */
        on(name: 'window-open', callback: (win: WorkspaceWindow, window: Window) => any, ctx?: any): EventRef;

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

        /**
         * Runs the callback function right away if layout is already ready,.
         * or push it to a queue to be called later when layout is ready.
         *
         * @param callback - The callback to run.
         * @example
         * ```ts
         * workspace.onLayoutReady(() => {
         *     console.log('layout is ready');
         * });
         * ```
         * @official
         */
        onLayoutReady(callback: () => any): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onLinkContextMenu(args: unknown[]): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onQuickPreview(args: unknown[]): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onResize(): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onStartLink(leaf: WorkspaceLeaf): void;

        /**
         * Open a link text.
         *
         * @param linktext - The link text to open.
         * @param sourcePath - The source path to open.
         * @param newLeaf - The type of the leaf to open.
         * @param openViewState - The view state to open.
         * @example
         * ```ts
         * app.workspace.openLinkText('foo', 'bar.md', 'tab');
         * ```
         * @official
         */
        openLinkText(
            linktext: string,
            sourcePath: string,
            newLeaf?: PaneType | boolean,
            openViewState?: OpenViewState
        ): Promise<void>;

        /**
         * Open a leaf in a popup window.
         *
         * @remark Prefer usage of `app.workspace.openPopoutLeaf`.
         * @unofficial
         */
        openPopout(data?: WorkspaceWindowInitData): WorkspaceWindow;

        /**
         * Open a new popout window with a single new leaf and return that leaf.
         * Only works on the desktop app.
         *
         * @param data - The data to pass to the popout window.
         * @returns The leaf that was created.
         * @official
         */
        openPopoutLeaf(data?: WorkspaceWindowInitData): WorkspaceLeaf;

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
         * Bring a given leaf to the foreground. If the leaf is in a sidebar, the sidebar will be uncollapsed.
         * `await` this function to ensure your view has been fully loaded and is not deferred.
         *
         * @param leaf - The leaf to bring to the foreground.
         * @returns A promise that resolves when the leaf is brought to the foreground.
         * @official
         */
        revealLeaf(leaf: WorkspaceLeaf): Promise<void>;

        /**
         * Save workspace layout to disk.
         *
         * @unofficial
         */
        saveLayout(): Promise<void>;

        /**
         * Sets the active leaf.
         *
         * @param leaf - The new active leaf.
         * @param params - Parameter object of whether to set the focus.
         * @example
         * ```ts
         * app.workspace.setActiveLeaf(app.workspace.getLeaf(false), { focus: true });
         * ```
         * @official
         */
        setActiveLeaf(leaf: WorkspaceLeaf, params?: {
            /** @official */
            focus?: boolean;
        }): void;

        /**
         * Sets the active leaf.
         *
         * @param leaf - The new active leaf.
         * @param pushHistory - Whether to push the history.
         * @param focus - Whether to focus the leaf.
         * @example
         * ```ts
         * app.workspace.setActiveLeaf(app.workspace.getLeaf(false), true, true);
         * ```
         * @deprecated - function signature changed. Use other form instead.
         * @official
         */
        setActiveLeaf(leaf: WorkspaceLeaf, pushHistory: boolean, focus: boolean): void;

        /**
         * Use deserialized layout data to reconstruct the workspace
         *
         * @unofficial
         */
        setLayout(data: SerializedWorkspace): Promise<void>;

        /**
         * Split the active leaf.
         *
         * @param direction - The direction to split the leaf in.
         * @returns The leaf that was created.
         * @deprecated - You should use {@link Workspace.getLeaf|getLeaf(true)} instead which does the same thing.
         * @official
         */
        splitActiveLeaf(direction?: SplitDirection): WorkspaceLeaf;

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

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
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
         * Calling this function will update/reconfigure the options of all Markdown views.
         * It is fairly expensive, so it should not be called frequently.
         *
         * @official
         */
        updateOptions(): void;

        /**
         * Update the internal title of the application.
         *
         * @remark This title is shown as the application title in the OS taskbar.
         * @unofficial
         */
        updateTitle(): void;
    }
}
