import type { Extension } from '@codemirror/state';
import type { Constructor } from 'obsidian';

import type { getWorkspaceConstructor } from '../implementations/constructors/augmentations/getWorkspaceConstructor.d.ts';
import type { CanvasConnection } from '../internals/CanvasConnection.d.ts';
import type { CanvasNode } from '../internals/CanvasNode.d.ts';
import type { EditorSuggestEx } from '../internals/EditorSuggestEx.d.ts';
import type { EnsureSideLeafOptions } from '../internals/EnsureSideLeafOptions.d.ts';
import type { GetRecentFilesOptions } from '../internals/GetRecentFilesOptions.d.ts';
import type { HoverLinkEvent } from '../internals/HoverLinkEvent.d.ts';
import type { CanvasView } from '../internals/internal-plugins/canvas/CanvasView.d.ts';
import type { SearchView } from '../internals/internal-plugins/global-search/SearchView.d.ts';
import type { LeafEntry } from '../internals/LeafEntry.d.ts';
import type { MarkdownScrollableEditView } from '../internals/MarkdownScrollableEditView.d.ts';
import type { ObsidianTouchEvent } from '../internals/ObsidianTouchEvent.d.ts';
import type { RecentFileTracker } from '../internals/RecentFileTracker.d.ts';
import type { StateHistory } from '../internals/StateHistory.d.ts';
import type { TypedWorkspaceLeaf } from '../internals/TypedWorkspaceLeaf.d.ts';
import type { ViewTypeType } from '../internals/views/ViewTypeType.d.ts';
import type { ViewTypeViewMapping } from '../internals/views/ViewTypeViewMapping.d.ts';
import type { SerializedWorkspace } from '../internals/workspace/SerializedWorkspace.d.ts';
import type { SetActiveLeafParams } from '../internals/workspace/SetActiveLeafParams.d.ts';
import type { WorkspaceHoverLinkSourcesRecord } from '../internals/workspace/WorkspaceHoverLinkSourcesRecord.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A workspace.
   * @since 0.9.7
   */
  interface Workspace extends Events {
    /**
     * Internal reference to the active editor.
     *
     * @unofficial
     */
    _activeEditor: MarkdownFileInfo | null;

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
     * `activeLeaf` is `null`.
     *
     * @deprecated The use of this field is discouraged.
     * The recommended alternatives are:
     * - If you need information about the current view, use {@link Workspace.getActiveViewOfType}.
     * - If you need to open a new file or navigate a view, use {@link Workspace.getLeaf}.
     * @official
     * @since 0.9.7
     */
    activeLeaf: null | WorkspaceLeaf;

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
     * Backlink in document plugin instance, if enabled.
     * @unofficial
     */
    backlinkInDocument?: unknown;

    /**
     * The container element of the workspace.
     *
     * @official
     * @since 0.9.7
     */
    containerEl: HTMLElement;

    /**
     * Registered CodeMirror editor extensions, to be applied to all CM instances.
     *
     * @unofficial
     */
    editorExtensions: Extension[];

    /**
     * The global editor suggest manager for live autocomplete.
     * @unofficial
     */
    editorSuggest: EditorSuggestEx;

    /**
     * The workspace split that contains popout (floating) windows.
     * @unofficial
     */
    floatingSplit: WorkspaceSplit;

    /**
     * Registered sources for hover link previews.
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
     * Whether the last active tab group had stacked tabs enabled.
     * @unofficial
     */
    lastTabGroupStacked: boolean;

    /**
     * Queue of layout items pending initialization.
     * @unofficial
     */
    layoutItemQueue: unknown[];

    /**
     * Whether the layout of the app has been successfully initialized.
     * To react to the layout becoming ready, use {@link Workspace.onLayoutReady}
     *
     * @official
     * @since 0.9.7
     */
    layoutReady: boolean;

    /**
     * The left ribbon of the workspace.
     *
     * @official
     * @since 0.9.7
     */
    leftRibbon: WorkspaceRibbon;

    /**
     * Button element for toggling the left sidebar.
     * @unofficial
     */
    leftSidebarToggleButtonEl: HTMLElement;

    /**
     * The left split of the workspace.
     *
     * @official
     * @since 0.9.7
     */
    leftSplit: WorkspaceMobileDrawer | WorkspaceSidedock;

    /**
     * Array of renderCallbacks
     *
     * @unofficial
     */
    mobileFileInfos: unknown[];

    /**
     * Callbacks queued to run when the layout is ready.
     * @unofficial
     */
    onLayoutReadyCallbacks?: unknown;

    /**
     * Registered operator function configurations.
     *
     * @unofficial
     */
    operatorFuncConfigs: Record<string, unknown>;

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
     * @since 0.16.0
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
     * Button element for toggling the right sidebar.
     * @unofficial
     */
    rightSidebarToggleButtonEl: HTMLElement;

    /**
     * The right split of the workspace.
     *
     * @official
     * @since 0.9.7
     */
    rightSplit: WorkspaceMobileDrawer | WorkspaceSidedock;

    /**
     * The root split of the workspace.
     *
     * @official
     * @since 0.9.7
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
     * @param file - The file info to add.
     * @unofficial
     */
    addMobileFileInfo(file: unknown): void;

    /**
     * Add a file to the recent files list.
     *
     * @param file - The file to add to recent files.
     * @unofficial
     */
    addRecentFile(file: TFile): void;

    /**
     * Change the layout of the workspace.
     *
     * @param workspace - The workspace to change the layout to.
     * @returns A promise that resolves when the layout is changed.
     * To get the constructor instance, use {@link getWorkspaceConstructor} from `obsidian-typings/implementations`.
     * @official
     * @since 0.9.7
     */
    changeLayout(workspace: unknown): Promise<void>;

    /**
     * Clear layout of workspace and destruct all leaves
     *
     * @returns A promise that resolves when the layout is cleared.
     * @unofficial
     */
    clearLayout(): Promise<void>;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getWorkspaceConstructor} from `obsidian-typings/implementations`.
     *
     * @param app - The app.
     * @param containerEl - The containerEl.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor2__(app: App, containerEl: HTMLElement): this;

    /**
     * Create a leaf by a split.
     *
     * @param leaf - The leaf to create the leaf by.
     * @param direction - The direction to create the leaf in.
     * @param before - Whether to create the leaf before the current leaf.
     * @returns The leaf that was created.
     * @official
     * @since 0.9.7
     */
    createLeafBySplit(leaf: WorkspaceLeaf, direction?: SplitDirection, before?: boolean): WorkspaceLeaf;

    /**
     * Create a leaf in a parent.
     *
     * @param parent - The parent to create the leaf in.
     * @param index - The index to create the leaf in.
     * @returns The leaf that was created.
     * @official
     * @since 0.9.11
     */
    createLeafInParent(parent: WorkspaceSplit, index: number): WorkspaceLeaf;

    /**
     * Create a leaf in the selected tab group or last used tab group.
     *
     * @param tabs Tab group to create leaf in.
     * @returns The leaf that was created.
     * @unofficial
     */
    createLeafInTabGroup(tabs?: WorkspaceTabs): WorkspaceLeaf;

    /**
     * Deserialize workspace entries into actual Leaf objects.
     *
     * @param leaf - Leaf entry to deserialize.
     * @param ribbon - Whether the leaf belongs to the left or right ribbon.
     * @returns A promise that resolves to the deserialized leaf.
     * @unofficial
     */
    deserializeLayout(leaf: LeafEntry, ribbon?: 'left' | 'right'): Promise<WorkspaceLeaf>;

    /**
     * Remove all leaves of the given type.
     *
     * @param viewType - The type of the view to remove.
     * @official
     * @since 0.9.7
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
     * @since 0.13.8
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
      leafType: boolean | PaneType,
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
     * @since 1.7.2
     */
    ensureSideLeaf(type: string, side: Side, options?: EnsureSideLeafOptions): Promise<WorkspaceLeaf>;

    /**
     * Focus on a specific leaf.
     *
     * @param leaf - The leaf to focus.
     * @unofficial
     */
    focusLeaf(leaf: WorkspaceLeaf): void;

    /**
     * Returns the file for the current view if it's a `FileView`.
     * Otherwise, it will return the most recently active file.
     *
     * @returns The active file or `null` if no file is active.
     * @official
     */
    getActiveFile(): null | TFile;

    /**
     * Get active file view if exists.
     *
     * @returns The active file view or `null`.
     * @unofficial
     */
    getActiveFileView(): FileView | null;

    /**
     * Get the active leaf of the given view type.
     *
     * @param type - The type of the view to get.
     * @returns The active leaf of the given type or `null`.
     * @deprecated - Use {@link getActiveViewOfType} instead
     * @unofficial
     */
    getActiveLeafOfViewType<T extends View>(type: Constructor<T>): null | T;

    /**
     * Get the currently active view of a given type.
     *
     * @param type - The type of the view to get.
     * @returns The active view of the given type or `null` if no view of the given type is active.
     * @official
     * @since 0.9.16
     */
    getActiveViewOfType<T extends View>(type: Constructor<T>): null | T;

    /**
     * Get adjacent leaf in specified direction.
     *
     * @param leaf - The reference leaf.
     * @param direction - The direction to search.
     * @returns The adjacent leaf or `null` if none found.
     * @remark Potentially does not work.
     * @unofficial
     */
    getAdjacentLeafInDirection(
      leaf: WorkspaceLeaf,
      direction: 'bottom' | 'left' | 'right' | 'top'
    ): null | WorkspaceLeaf;

    /**
     * Get the direction where the leaf should be dropped on dragevent
     *
     * @param e - The drag event.
     * @param rect - The bounding rectangle of the drop target.
     * @param directions - Allowed drop directions.
     * @param leaf - The leaf being dropped.
     * @returns The drop direction.
     * @unofficial
     */
    getDropDirection(
      e: DragEvent,
      rect: DOMRect,
      directions: ['left', 'right'],
      leaf: WorkspaceLeaf
    ): 'bottom' | 'center' | 'left' | 'right' | 'top';

    /**
     * Get the leaf where the leaf should be dropped on dragevent.
     *
     * @param e Drag event.
     * @returns The leaf at the drop location or `null`.
     * @unofficial
     */
    getDropLocation(e: DragEvent): null | WorkspaceLeaf;

    /**
     * Get the workspace split for the currently focused container.
     *
     * @returns The focused workspace split.
     * @unofficial
     */
    getFocusedContainer(): WorkspaceSplit;

    /**
     * Get all leaves that belong to a group.
     *
     * @param group - The id of the group to get the leaves from.
     * @returns The leaves that belong to the group.
     * @official
     * @since 0.9.7
     */
    getGroupLeaves(group: string): WorkspaceLeaf[];

    /**
     * Get the filenames of the 10 most recently opened files.
     *
     * @returns The filenames of the 10 most recently opened files.
     * @official
     * @since 0.9.7
     */
    getLastOpenFiles(): string[];

    /**
     * Get the layout of the workspace.
     *
     * @returns The layout of the workspace.
     * @official
     * @since 0.9.7
     */
    getLayout(): Record<string, unknown>;

    /**
     * Creates a new leaf in a leaf adjacent to the currently active leaf.
     * If direction is `'vertical'`, the leaf will appear to the right.
     * If direction is `'horizontal'`, the leaf will appear below the current leaf.
     *
     * @param newLeaf - Should be `'split'` to create a new split leaf.
     * @param direction - The direction to split the leaf in.
     * @official
     * @since 0.16.0
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
    getLeaf(newLeaf?: boolean | PaneType): WorkspaceLeaf;

    /**
     * Retrieve a leaf by its id.
     *
     * @param id id of the leaf to retrieve.
     * @returns The leaf that was retrieved.
     * @official
     * @since 1.5.1
     */
    getLeafById(id: string): null | WorkspaceLeaf;

    /**
     * Get all leaves of a given type.
     *
     * @param viewType - The type of the view to get.
     * @returns The leaves of the given type.
     * @official
     * @since 0.9.7
     */
    getLeavesOfType(viewType: string): WorkspaceLeaf[];

    /**
     * Get leaves of a specific view type.
     *
     * @param viewType - The view type to get leaves for.
     * @returns The leaves matching the given view type.
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
     * @since 0.9.7
     */
    getLeftLeaf(split: boolean): null | WorkspaceLeaf;

    /**
     * Get the most recently active leaf in a given workspace root. Useful for interacting with the leaf in the root split while a sidebar leaf might be active.
     *
     * @param root - The root to get the most recently active leaf from. If a root is not provided, the `rootSplit` and leaves within pop-outs will be searched.
     * @returns The most recently active leaf.
     * @official
     * @since 0.15.4
     */
    getMostRecentLeaf(root?: WorkspaceParent): null | WorkspaceLeaf;

    /**
     * Get n last opened files of type (defaults to 10).
     *
     * @param options - Options for filtering recent files.
     * @returns The filenames of recently opened files.
     * @unofficial
     */
    getRecentFiles(options?: GetRecentFilesOptions): string[];

    /**
     * Create a new leaf inside the right sidebar.
     *
     * @param split - Should the existing split be split up?.
     * @returns The leaf that was created or `null` if the right sidebar is not open.
     * @official
     * @since 0.9.7
     */
    getRightLeaf(split: boolean): null | WorkspaceLeaf;

    /**
     * Get leaf in the side ribbon/dock and split if necessary.
     *
     * @param sideRibbon Side ribbon to get leaf from.
     * @param split Whether to split the leaf if it does not exist.
     * @returns The side leaf.
     * @unofficial
     */
    getSideLeaf(sideRibbon: WorkspaceMobileDrawer | WorkspaceSidedock, split: boolean): WorkspaceLeaf;

    /**
     * Get the unpinned leaf.
     *
     * @returns The unpinned leaf.
     * @deprecated - You should use {@link Workspace.getLeaf|getLeaf(false)} instead which does the same thing.
     * @official
     */
    getUnpinnedLeaf(): WorkspaceLeaf;

    /**
     * Handle the context menu for an external URL link.
     *
     * @param menu - The context menu.
     * @param linkText - The URL link text.
     * @unofficial
     */
    handleExternalLinkContextMenu(menu: Menu, linkText: string): void;

    /**
     * Handle the context menu for an internal link.
     *
     * @param menu - The context menu.
     * @param linkText - The internal link text.
     * @param sourcePath - The source path of the link.
     * @param leaf - The leaf to add context actions for.
     * @unofficial
     * @since 0.12.10
     */
    handleLinkContextMenu(menu: Menu, linkText: string, sourcePath: string, leaf?: WorkspaceLeaf): void;

    /**
     * Handler for x-callback-url actions.
     *
     * @param params - The URL parameters from the x-callback-url.
     * @param file - The file associated with the callback.
     * @returns Whether the callback was handled.
     * @unofficial
     */
    handleXCallback(params: Record<string, string>, file: TFile): boolean;

    /**
     * Check if there is any undo history available.
     *
     * @returns Whether there is undo history.
     * @unofficial
     */
    hasUndoHistory(): boolean;

    /**
     * Check if leaf has been attached to the workspace
     *
     * @param leaf - The leaf to check.
     * @returns Whether the leaf is attached.
     * @unofficial
     */
    isAttached(leaf?: WorkspaceLeaf): boolean;

    /**
     * Check if a leaf is in the sidebar.
     *
     * @param leaf - The leaf to check.
     * @returns Whether the leaf is in the sidebar.
     * @unofficial
     */
    isInSidebar(leaf: WorkspaceLeaf): boolean;

    /**
     * Iterate through all leaves, including main area leaves, floating leaves, and sidebar leaves.
     *
     * @param callback - The callback to call for each leaf.
     * @official
     * @since 0.9.7
     */
    iterateAllLeaves(callback: (leaf: WorkspaceLeaf) => unknown): void;

    /**
     * Iterate through all CodeMirror instances in the workspace.
     *
     * @param _unused - Unused. The method body is empty at runtime.
     * @unofficial
     */
    iterateCodeMirrors(_unused: unknown): void;

    /**
     * Iterate the leaves of a split.
     *
     * @param split - The split to iterate.
     * @param callback - The callback to call for each leaf.
     * @unofficial
     */
    iterateLeaves(split: WorkspaceSplit, callback: (leaf: WorkspaceLeaf) => unknown): void;

    /**
     * Iterate through all leaves in the main area of the workspace.
     *
     * @param callback - The callback to call for each leaf.
     * @official
     * @since 0.9.7
     */
    iterateRootLeaves(callback: (leaf: WorkspaceLeaf) => unknown): void;

    /**
     * Iterate the tabs of a split till meeting a condition.
     *
     * @param tabs - The split(s) to iterate.
     * @param cb - The callback to call for each leaf. Return `true` to stop.
     * @returns Whether the iteration was stopped early.
     * @unofficial
     */
    iterateTabs(tabs: WorkspaceSplit | WorkspaceSplit[], cb: (leaf: WorkspaceLeaf) => boolean): boolean;

    /**
     * Load workspace from disk and initialize
     *
     * @returns A promise that resolves when the layout is loaded.
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
     * @since 0.15.4
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
     * @since 0.10.9
     */
    on(name: 'active-leaf-change', callback: (leaf: null | WorkspaceLeaf) => unknown, ctx?: unknown): EventRef;

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
    on(name: 'css-change', callback: () => unknown, ctx?: unknown): EventRef;

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
      callback: (editor: Editor, info: MarkdownFileInfo | MarkdownView) => unknown,
      ctx?: unknown
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
      callback: (evt: DragEvent, editor: Editor, info: MarkdownFileInfo | MarkdownView) => unknown,
      ctx?: unknown
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
      callback: (menu: Menu, editor: Editor, info: MarkdownFileInfo | MarkdownView) => unknown,
      ctx?: unknown
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
      callback: (evt: ClipboardEvent, editor: Editor, info: MarkdownFileInfo | MarkdownView) => unknown,
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
      callback: (editor: Editor, info: MarkdownFileInfo | MarkdownView) => unknown,
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
      callback: (menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf) => unknown,
      ctx?: unknown
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
    on(name: 'file-open', callback: (file: null | TFile) => unknown, ctx?: unknown): EventRef;

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
      callback: (menu: Menu, files: TAbstractFile[], source: string, leaf?: WorkspaceLeaf) => unknown,
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
    on(name: 'layout-change', callback: () => unknown, ctx?: unknown): EventRef;

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
    on(name: 'quick-preview', callback: (file: TFile, data: string) => unknown, ctx?: unknown): EventRef;

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
    on(name: 'quit', callback: (tasks: Tasks) => unknown, ctx?: unknown): EventRef;

    /**
     * Triggered when user shares files on mobile.
     *
     * @param name - Should be `'receive-files-menu'`.
     * @param callback - The callback function.
     * @param ctx - The context passed as `this` to the `callback` function.
     * @returns The event reference.
     * @example
     * ```ts
     * app.workspace.on('receive-files-menu', (menu, files) => {
     *     console.log(menu, files);
     * });
     * ```
     * @unofficial
     */
    on(name: 'receive-files-menu', callback: (menu: Menu, files: TFile[]) => void, ctx?: unknown): EventRef;

    /**
     * Triggered when user shares text on mobile.
     *
     * @param name - Should be `'receive-text-menu'`.
     * @param callback - The callback function.
     * @param ctx - The context passed as `this` to the `callback` function.
     * @returns The event reference.
     * @example
     * ```ts
     * app.workspace.on('receive-text-menu', (menu, text) => {
     *     console.log(menu, text);
     * });
     * ```
     * @unofficial
     */
    on(name: 'receive-text-menu', callback: (menu: Menu, text: string) => void, ctx?: unknown): EventRef;

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
    on(name: 'resize', callback: () => unknown, ctx?: unknown): EventRef;

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
    on(name: 'url-menu', callback: (menu: Menu, url: string) => unknown, ctx?: unknown): EventRef;

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
    on(name: 'window-close', callback: (win: WorkspaceWindow, window: Window) => unknown, ctx?: unknown): EventRef;

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
    on(name: 'window-open', callback: (win: WorkspaceWindow, window: Window) => unknown, ctx?: unknown): EventRef;

    /**
     * Handles drag event on leaf
     *
     * @param e - The drag event.
     * @param leaf - The leaf being dragged.
     * @unofficial
     */
    onDragLeaf(e: DragEvent, leaf: WorkspaceLeaf): void;

    /**
     * Handles layout change and saves layout to disk
     *
     * @param leaf - The leaf that changed, if any.
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
     * @since 0.11.0
     */
    onLayoutReady(callback: () => unknown): void;

    /**
     * Trigger the quick preview event with the given arguments.
     *
     * @param file - The file to preview.
     * @param data - The data to preview.
     * @unofficial
     */
    onQuickPreview(file: TFile, data: string): void;

    /**
     * Handle a resize event on the workspace.
     * @unofficial
     */
    onResize(): void;

    /**
     * Handle the start of a link drag operation from a leaf.
     *
     * @param leaf - The leaf where the drag started.
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
     * @returns A promise that resolves when the link is opened.
     * @example
     * ```ts
     * app.workspace.openLinkText('foo', 'bar.md', 'tab');
     * ```
     * @official
     * @since 0.16.0
     */
    openLinkText(
      linktext: string,
      sourcePath: string,
      newLeaf?: boolean | PaneType,
      openViewState?: OpenViewState
    ): Promise<void>;

    /**
     * Open a leaf in a popup window.
     *
     * @param data - The data to pass to the popout window.
     * @returns The popout window that was created.
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
     * @since 0.15.4
     */
    openPopoutLeaf(data?: WorkspaceWindowInitData): WorkspaceLeaf;

    /**
     * Push leaf change to history
     *
     * @param leaf - The leaf to push.
     * @param parentID - The parent ID.
     * @param rootID - The root ID.
     * @unofficial
     */
    pushUndoHistory(leaf: WorkspaceLeaf, parentID: string, rootID: string): void;

    /**
     * Read workspace layout data from disk.
     *
     * @returns A promise that resolves to the workspace data.
     * @unofficial
     */
    readWorkspaceFile(): Promise<SerializedWorkspace>;

    /**
     * Get drag event target location
     *
     * @param e - The drag event.
     * @param leaf - The leaf being dragged.
     * @returns The target tab group or `null`.
     * @unofficial
     */
    recursiveGetTarget(e: DragEvent, leaf: WorkspaceLeaf): null | WorkspaceTabs;

    /**
     * Register a CodeMirror editor extension.
     *
     * @param extension - The extension to register.
     * @remark Prefer registering the extension via the Plugin class.
     * @unofficial
     */
    registerEditorExtension(extension: Extension): void;

    /**
     * Registers hover link source
     *
     * @param key - The key for the hover link source.
     * @param source - The hover link source to register.
     * @unofficial
     */
    registerHoverLinkSource(key: string, source: HoverLinkSource): void;

    /**
     * Registers Obsidian protocol handler
     *
     * @param protocol - The protocol to register.
     * @param handler - The handler for the protocol.
     * @unofficial
     */
    registerObsidianProtocolHandler(protocol: string, handler: ObsidianProtocolHandler): void;

    /**
     * Register operator function configurations.
     *
     * @param id - The identifier for the operator func configs.
     * @param configs - The configurations to register.
     * @unofficial
     */
    registerOperatorFuncConfigs(id: string, configs: unknown): void;

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
     * Request execution of layout change events.
     *
     * @unofficial
     */
    requestLayoutChangeEvents(): void;

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
     * @since 1.7.2
     */
    revealLeaf(leaf: WorkspaceLeaf): Promise<void>;

    /**
     * Save workspace layout to disk.
     *
     * @returns A promise that resolves when the layout is saved.
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
     * @since 0.16.3
     */
    setActiveLeaf(leaf: WorkspaceLeaf, params?: SetActiveLeafParams): void;

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
     * @param data - The serialized workspace data.
     * @returns A promise that resolves when the layout is reconstructed.
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
     * @since 0.9.7
     */
    splitActiveLeaf(direction?: SplitDirection): WorkspaceLeaf;

    /**
     * Split leaves in specified direction
     *
     * @param leaf - The leaf to split.
     * @param newLeaf - The new leaf to insert.
     * @param direction - The split direction.
     * @param before - Whether to insert before the current leaf.
     * @unofficial
     */
    splitLeaf(leaf: WorkspaceLeaf, newLeaf: WorkspaceLeaf, direction?: SplitDirection, before?: boolean): void;

    /**
     * Split provided leaf, or active leaf if none provided.
     *
     * @param leaf - The leaf to split, or `undefined` for active leaf.
     * @param direction - The split direction.
     * @returns The newly created leaf.
     * @unofficial
     */
    splitLeafOrActive(leaf?: WorkspaceLeaf, direction?: SplitDirection): WorkspaceLeaf;

    /**
     * Unregister a CodeMirror editor extension
     *
     * @param extension - The extension to unregister.
     * @unofficial
     */
    unregisterEditorExtension(extension: Extension): void;

    /**
     * Unregister hover link source
     *
     * @param key - The key for the hover link source to unregister.
     * @unofficial
     */
    unregisterHoverLinkSource(key: string): void;

    /**
     * Unregister Obsidian protocol handler
     *
     * @param protocol - The protocol to unregister.
     * @param handler - The handler to unregister.
     * @unofficial
     */
    unregisterObsidianProtocolHandler(protocol: string, handler: ObsidianProtocolHandler): void;

    /**
     * Unregister operator function configurations.
     *
     * @param id - The identifier for the operator func configs to unregister.
     * @unofficial
     */
    unregisterOperatorFuncConfigs(id: string): void;

    /**
     * Unset the active editor.
     *
     * @param editor - The editor to unset.
     * @unofficial
     */
    unsetActiveEditor(editor: MarkdownFileInfo): void;

    /**
     * Update the frameless window chrome (title bar) display.
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
     * @since 0.13.21
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
