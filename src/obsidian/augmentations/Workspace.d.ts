import type { InternalPluginName } from "../implementations/index.ts";
import type {
    CanvasConnection,
    CanvasNode,
    CanvasView,
    FileExplorerLeaf,
    GlobalSearchLeaf,
    HoverLinkEvent,
    LeafEntry,
    ObsidianTouchEvent,
    RecentFileTracker,
    SerializedWorkspace,
    StateHistory,
    WorkspaceHoverLinkSourcesRecord
} from "../index.js";
import type { Extension } from "@codemirror/state";
import type { Constructor } from "obsidian";

export {};

declare module "obsidian" {
    interface Workspace extends Events {
        /**
         * Currently active tab group
         */
        activeTabGroup: WorkspaceTabs;
        /**
         * Reference to App
         */
        app: App;
        /** @internal */
        backlinkInDocument?: unknown;
        /**
         * Registered CodeMirror editor extensions, to be applied to all CM instances
         */
        editorExtensions: Extension[];
        /** @internal */
        editorSuggest: {
            currentSuggest?: EditorSuggest<unknown>;
            suggests: EditorSuggest<unknown>[];
        };
        /** @internal */
        floatingSplit: WorkspaceSplit;
        /** @internal */
        hoverLinkSources: WorkspaceHoverLinkSourcesRecord;
        /**
         * Last opened file in the vault
         */
        lastActiveFile: TFile;
        /** @internal */
        lastTabGroupStacked: boolean;
        /** @internal */
        layoutItemQueue: unknown[];
        /**
         * Workspace has finished loading
         */
        layoutReady: boolean;
        /** @internal */
        leftSidebarToggleButtonEl: HTMLElement;
        /** @internal Array of renderCallbacks */
        mobileFileInfos: unknown[];
        /** @internal */
        onLayoutReadyCallbacks?: unknown;
        /**
         * Protocol handlers registered on the workspace
         */
        protocolHandlers: Map<string, ObsidianProtocolHandler>;
        /**
         * Tracks last opened files in the vault
         */
        recentFileTracker: RecentFileTracker;
        /** @internal */
        rightSidebarToggleButtonEl: HTMLElement;
        /** @internal Keyscope registered to the vault */
        scope: Scope;
        /**
         * List of states that were closed and may be reopened
         */
        undoHistory: StateHistory[];

        /** @internal Change active leaf and trigger leaf change event */
        activeLeafEvents(): void;
        /** @internal Add file to mobile file info */
        addMobileFileInfo(file: unknown): void;
        /** @internal Clear layout of workspace and destruct all leaves */
        clearLayout(): Promise<void>;
        /**
         * @param tabs Tab group to create leaf in
         * @internal Create a leaf in the selected tab group or last used tab group
         */
        createLeafInTabGroup(tabs?: WorkspaceTabs): WorkspaceLeaf;
        /**
         * @param leaf Leaf entry to deserialize
         * @param ribbon Whether the leaf belongs to the left or right ribbon
         * @internal Deserialize workspace entries into actual Leaf objects
         */
        deserializeLayout(leaf: LeafEntry, ribbon?: "left" | "right"): Promise<WorkspaceLeaf>;
        /**
         * @param type View type of leaf
         * @param ribbon Side ribbon to reveal leaf in
         * @param viewState Open state of leaf
         * @internal Reveal leaf in side ribbon with specified view type and state
         */
        ensureSideLeaf(type: string, ribbon: "left" | "right", viewState: OpenViewState): void;
        /**
         * Get active file view if exists
         */
        getActiveFileView(): FileView | null;
        /** @deprecated Use `getActiveViewOfType` instead */
        getActiveLeafOfViewType<T extends View>(type: Constructor<T>): T | null;
        /**
         * Get adjacent leaf in specified direction
         *
         * @remark Potentially does not work
         */
        getAdjacentLeafInDirection(
            leaf: WorkspaceLeaf,
            direction: "top" | "bottom" | "left" | "right"
        ): WorkspaceLeaf | null;
        /** @internal Get the direction where the leaf should be dropped on dragevent */
        getDropDirection(
            e: DragEvent,
            rect: DOMRect,
            directions: ["left", "right"],
            leaf: WorkspaceLeaf
        ): "left" | "right" | "top" | "bottom" | "center";
        /**
         * @param e Drag event
         * @internal Get the leaf where the leaf should be dropped on dragevent
         */
        getDropLocation(e: DragEvent): WorkspaceLeaf | null;
        /**
         * Get the workspace split for the currently focused container
         */
        getFocusedContainer(): WorkspaceSplit;
        getLeavesOfType(viewType: typeof InternalPluginName.FileExplorer): FileExplorerLeaf[];
        /**
         * Get n last opened files of type (defaults to 10)
         */
        getRecentFiles(arg?: {
            showMarkdown: boolean;
            showCanvas: boolean;
            showNonImageAttachments: boolean;
            showImages: boolean;
            maxCount: number;
        }): string[];
        /**
         * Get leaf in the side ribbon/dock and split if necessary
         *
         * @param sideRibbon Side ribbon to get leaf from
         * @param split Whether to split the leaf if it does not exist
         */
        getSideLeaf(sideRibbon: WorkspaceSidedock | WorkspaceMobileDrawer, split: boolean): WorkspaceLeaf;
        /** @internal */
        handleExternalLinkContextMenu(menu: Menu, linkText: string): void;
        /** @internal */
        handleLinkContextMenu(menu: Menu, linkText: string, sourcePath: string): void;
        /** @internal Check if leaf has been attached to the workspace */
        isAttached(leaf?: WorkspaceLeaf): boolean;
        /**
         * Iterate the leaves of a split
         */
        iterateLeaves(split: WorkspaceSplit, callback: (leaf: WorkspaceLeaf) => unknown): void;
        /**
         * Iterate the tabs of a split till meeting a condition
         */
        iterateTabs(tabs: WorkspaceSplit | WorkspaceSplit[], cb: (leaf: WorkspaceLeaf) => boolean): boolean;
        /** @internal Load workspace from disk and initialize */
        loadLayout(): Promise<void>;
        /**
         * @internal Triggers when user hovers over any note link element (file explorer, editor, ...)
         * @remark Used for preparing (Ctrl) hover previews
         */
        on(name: "hover-link", callback: (event: HoverLinkEvent) => void, ctx?: unknown): EventRef;
        /** @internal Called whenever user opens tab group menu (contains e.g. stacked tabs button) */
        on(name: "tab-group-menu", callback: (tabMenu: Menu, tabsLeaf: WorkspaceTabs) => void, ctx?: unknown): EventRef;
        /** @internal Triggers when user swipes open left/right sidebar */
        on(name: "swipe", callback: (touchEvents: ObsidianTouchEvent[]) => void, ctx?: unknown): EventRef;
        /**
         * Triggers when workspace layout is loaded
         *
         * @remark Prefer usage of onLayoutReady instead
         */
        on(name: "layout-ready", callback: () => void, ctx?: unknown): EventRef;
        /** @internal Triggers when user right-clicks on external URL in editor */
        on(name: "url-menu", callback: (menu: Menu, url: string) => void, ctx?: unknown): EventRef;
        /**
         * Triggers when user clicks on 'N results' button in search view
         */
        on(
            name: "search:results-menu",
            callback: (menu: Menu, search: GlobalSearchLeaf) => void,
            ctx?: unknown
        ): EventRef;
        /** @internal Called when user shares text on mobile */
        on(name: "receive-text-menu", callback: (menu: Menu, x: unknown) => void, ctx?: unknown): EventRef;
        /** @internal Called when user shares files on mobile */
        on(name: "receive-files-menu", callback: (menu: Menu, x: unknown) => void, ctx?: unknown): EventRef;
        /**
         * Triggers when the user opens a context menu on a selection of multiple nodes in the canvas
         */
        on(
            name: "canvas:selection-menu",
            callback: (menu: Menu, canvasView: CanvasView) => void,
            ctx?: unknown
        ): EventRef;
        /**
         * Triggers when the user opens a context menu on a single node in the canvas
         */
        on(name: "canvas:node-menu", callback: (menu: Menu, node: CanvasNode) => void, ctx?: unknown): EventRef;
        /**
         * Triggers when the user drops edge connection to empty space in the canvas
         */
        on(
            name: "canvas:node-connection-drop-menu",
            callback: (menu: Menu, originalNode: CanvasNode, connection: CanvasConnection) => void,
            ctx?: unknown
        ): EventRef;
        /**
         * Triggers when the user opens a context menu on a connection in the canvas
         */
        on(
            name: "canvas:edge-menu",
            callback: (menu: Menu, connection: CanvasConnection) => void,
            ctx?: unknown
        ): EventRef;
        /** @internal Handles drag event on leaf */
        onDragLeaf(e: DragEvent, leaf: WorkspaceLeaf): void;
        /** @internal Handles layout change and saves layout to disk */
        onLayoutChange(leaf?: WorkspaceLeaf): void;
        /** @internal */
        onLinkContextMenu(args: unknown[]): void;
        /** @internal */
        onQuickPreview(args: unknown[]): void;
        /** @internal */
        onResize(): void;
        /** @internal */
        onStartLink(leaf: WorkspaceLeaf): void;
        /**
         * Open a leaf in a popup window
         *
         * @remark Prefer usage of `app.workspace.openPopoutLeaf`
         */
        openPopout(data?: WorkspaceWindowInitData): WorkspaceWindow;
        /** @internal Push leaf change to history */
        pushUndoHistory(leaf: WorkspaceLeaf, parentID: string, rootID: string): void;
        /** @internal Get drag event target location */
        recursiveGetTarget(e: DragEvent, leaf: WorkspaceLeaf): WorkspaceTabs | null;
        /**
         * @internal Register a CodeMirror editor extension
         * @remark Prefer registering the extension via the Plugin class
         */
        registerEditorExtension(extension: Extension): void;
        /** @internal Registers hover link source */
        registerHoverLinkSource(key: string, source: HoverLinkSource): void;
        /** @internal Registers Obsidian protocol handler */
        registerObsidianProtocolHandler(protocol: string, handler: ObsidianProtocolHandler): void;
        /** @internal Constructs hook for receiving URI actions */
        registerUriHook(): void;
        /** @internal Request execution of activeLeaf change events */
        requestActiveLeafEvents(): void;
        /** @internal Request execution of resize event */
        requestResize(): void;
        /** @internal Request execution of layout update event */
        requestUpdateLayout(): void;
        /**
         * Save workspace layout to disk
         */
        saveLayout(): Promise<void>;
        /** @internal Use deserialized layout data to reconstruct the workspace */
        setLayout(data: SerializedWorkspace): Promise<void>;
        /** @internal Split leaves in specified direction */
        splitLeaf(leaf: WorkspaceLeaf, newLeaf: WorkspaceLeaf, direction?: SplitDirection, before?: boolean): void;
        /**
         * Split provided leaf, or active leaf if none provided
         */
        splitLeafOrActive(leaf?: WorkspaceLeaf, direction?: SplitDirection): WorkspaceLeaf;
        /** @internal Unregister a CodeMirror editor extension */
        unregisterEditorExtension(extension: Extension): void;
        /** @internal Unregister hover link source */
        unregisterHoverLinkSource(key: string): void;
        /** @internal Unregister Obsidian protocol handler */
        unregisterObsidianProtocolHandler(protocol: string): void;
        /** @internal */
        updateFrameless(): void;
        /** @internal Invoke workspace layout update, redraw and save */
        updateLayout(): void;
        /** @internal Update visibility of tab group */
        updateMobileVisibleTabGroup(): void;
        /**
         * Update the internal title of the application
         *
         * @remark This title is shown as the application title in the OS taskbar
         */
        updateTitle(): void;
    }
}
