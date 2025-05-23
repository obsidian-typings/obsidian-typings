import type {
    App,
    Debouncer
} from 'obsidian';
import type { MapOfSets } from '../../Collections/MapOfSets.d.ts';
import type { Pointer } from '../../Pointer.d.ts';
import type { CanvasViewData } from './CanvasData.d.ts';
import type { CanvasMenu } from './CanvasMenu.d.ts';
import type { CanvasRectEx } from './CanvasRectEx.d.ts';
import type { CanvasView } from './CanvasView.d.ts';
import type { CanvasViewCanvasEdge } from './CanvasViewCanvasEdge.d.ts';
import type { CanvasViewCanvasNode } from './CanvasViewCanvasNode.d.ts';
import type { CanvasViewConfig } from './CanvasViewConfig.d.ts';
import type { CanvasViewHistory } from './CanvasViewHistory.d.ts';
import type { EdgeIndex } from './EdgeIndex.d.ts';
import type { NodeInteractionLayer } from './NodeInteractionLayer.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvas {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    backgroundPatternEl: SVGPatternElement;

    /** @todo Documentation incomplete. */
    canvasControlsEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    canvasEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    canvasRect: CanvasRectEx;

    /** @todo Documentation incomplete. */
    cardMenuEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    config: CanvasViewConfig;

    /** @todo Documentation incomplete. */
    data: CanvasViewData;

    /** @todo Documentation incomplete. */
    dirty: Set<unknown>;

    /** @todo Documentation incomplete. */
    edgeContainerEl: SVGElement;

    /** @todo Documentation incomplete. */
    edgeEndContainerEl: SVGElement;

    /** @todo Documentation incomplete. */
    edgeFrom: MapOfSets<CanvasViewCanvasEdge, CanvasViewCanvasNode>;

    /** @todo Documentation incomplete. */
    edgeIndex: EdgeIndex;

    /** @todo Documentation incomplete. */
    edges: Map<string, CanvasViewCanvasEdge>;

    /** @todo Documentation incomplete. */
    edgeTo: MapOfSets<CanvasViewCanvasEdge, CanvasViewCanvasNode>;

    /** @todo Documentation incomplete. */
    finishViewportAnimation: boolean;

    /** @todo Documentation incomplete. */
    frame: number;

    /** @todo Documentation incomplete. */
    frameWin: null;

    /** @todo Documentation incomplete. */
    gridSpacing: number;

    /** @todo Documentation incomplete. */
    history: CanvasViewHistory;

    /** @todo Documentation incomplete. */
    isDragging: boolean;

    /** @todo Documentation incomplete. */
    isHoldingSpace: boolean;

    /** @todo Documentation incomplete. */
    keys: Object;

    /** @todo Documentation incomplete. */
    lastEdgesInViewport: Set<CanvasViewCanvasEdge>;

    /** @todo Documentation incomplete. */
    lastNodesInViewport: Set<CanvasViewCanvasNode>;

    /** @todo Documentation incomplete. */
    menu: CanvasMenu;

    /** @todo Documentation incomplete. */
    moved: Set<unknown>;

    /** @todo Documentation incomplete. */
    moverEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    nodeIndex: EdgeIndex;

    /** @todo Documentation incomplete. */
    nodeInteractionLayer: NodeInteractionLayer;

    /** @todo Documentation incomplete. */
    nodes: Map<string, CanvasViewCanvasNode>;

    /** @todo Documentation incomplete. */
    options?: unknown;

    /** @todo Documentation incomplete. */
    pauseAnimation: number;

    /** @todo Documentation incomplete. */
    pointer: Pointer;

    /** @todo Documentation incomplete. */
    pointerFrame: number;

    /** @todo Documentation incomplete. */
    pointerFrameWin: null;

    /** @todo Documentation incomplete. */
    quickSettingsButton: HTMLDivElement;

    /** @todo Documentation incomplete. */
    readonly: boolean;

    /** @todo Documentation incomplete. */
    redoBtnEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    requestPushHistory: Debouncer<[], unknown>;

    /** @todo Documentation incomplete. */
    requestUpdateFileOpen: Debouncer<[], unknown>;

    /** @todo Documentation incomplete. */
    scale: number;

    /** @todo Documentation incomplete. */
    screenshotting: boolean;

    /** @todo Documentation incomplete. */
    selection: Set<Selection>;

    /** @todo Documentation incomplete. */
    selectionChanged: boolean;

    /** @todo Documentation incomplete. */
    snapDistance?: unknown;

    /** @todo Documentation incomplete. */
    staleSelection: null;

    /** @todo Documentation incomplete. */
    tx: number;

    /** @todo Documentation incomplete. */
    ty: number;

    /** @todo Documentation incomplete. */
    tZoom: number;

    /** @todo Documentation incomplete. */
    undoBtnEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    view: CanvasView;

    /** @todo Documentation incomplete. */
    viewportChanged: boolean;

    /** @todo Documentation incomplete. */
    wasAnimating: boolean;

    /** @todo Documentation incomplete. */
    wrapperEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    x: number;

    /** @todo Documentation incomplete. */
    y: number;

    /** @todo Documentation incomplete. */
    zIndexCounter: number;

    /** @todo Documentation incomplete. */
    zoom: number;

    /** @todo Documentation incomplete. */
    zoomBreakpoint?: unknown;

    /** @todo Documentation incomplete. */
    zoomCenter: null;

    /** @todo Documentation incomplete. */
    zoomToFitQueued: boolean;

    /** @todo Documentation incomplete. */
    addEdge(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    addNode(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    applyHistory(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    cancelFrame(): unknown;

    /** @todo Documentation incomplete. */
    canSnap(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    clear(): unknown;

    /** @todo Documentation incomplete. */
    clearSnapPoints(): unknown;

    /** @todo Documentation incomplete. */
    cloneData(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    createFileNode(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    createFileNodes(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    createGroupNode(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    createLinkNode(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    createPlaceholder(): unknown;

    /** @todo Documentation incomplete. */
    createTextNode(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    deleteSelection(): unknown;

    /** @todo Documentation incomplete. */
    deselect(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    deselectAll(): unknown;

    /** @todo Documentation incomplete. */
    domFromPos(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    domPosFromClient(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    domPosFromEvt(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    dragTempNode(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** @todo Documentation incomplete. */
    endSnapPointRendering(): unknown;

    /** @todo Documentation incomplete. */
    generateHDImage(): Promise<unknown>;

    /** @todo Documentation incomplete. */
    getContainingNodes(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    getData(): unknown;

    /** @todo Documentation incomplete. */
    getEdgesForNode(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    getIntersectingEdges(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    getIntersectingNodes(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    getSelectionData(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    getSnapping(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /** @todo Documentation incomplete. */
    getState(): unknown;

    /** @todo Documentation incomplete. */
    getViewportBBox(): unknown;

    /** @todo Documentation incomplete. */
    getViewportNodes(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    getZIndex(): unknown;

    /** @todo Documentation incomplete. */
    handleCopy(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    handleCut(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    handleDragToSelect(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** @todo Documentation incomplete. */
    handleDragWithPan(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    handleMoverPointerdown(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    handlePaste(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    handleSelectionDrag(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** @todo Documentation incomplete. */
    hitTestNode(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    importData(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    interactionHitTest(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    load(): unknown;

    /** @todo Documentation incomplete. */
    markDirty(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    markMoved(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    markViewportChanged(): unknown;

    /** @todo Documentation incomplete. */
    nudgeSelection(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    onContextMenu(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onDoubleClick(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onGlobalKeydown(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onGlobalKeyup(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onKeydown(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onPointerdown(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onPointermove(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onPriorityPointerdown(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onResize(): unknown;

    /** @todo Documentation incomplete. */
    onSelectionContextMenu(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onTouchdown(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onWheel(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    overrideHistory(): unknown;

    /** @todo Documentation incomplete. */
    panBy(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    panIntoView(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    panTo(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    posCenter(): unknown;

    /** @todo Documentation incomplete. */
    posFromClient(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    posFromDom(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    posFromEvt(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    posInViewport(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    pushHistory(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    redo(): unknown;

    /** @todo Documentation incomplete. */
    removeEdge(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    removeNode(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    renderSnapPoints(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /** @todo Documentation incomplete. */
    requestFrame(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    requestSave(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    rerenderViewport(): unknown;

    /** @todo Documentation incomplete. */
    select(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    selectAll(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    selectOnly(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setData(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setDragging(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setReadonly(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setState(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setViewport(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** @todo Documentation incomplete. */
    showCreationMenu(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** @todo Documentation incomplete. */
    showQuickSettingsMenu(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    smartZoom(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    takeScreenshot(arg1: unknown, arg2: unknown): Promise<unknown>;

    /** @todo Documentation incomplete. */
    toggleGridSnapping(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    toggleObjectSnapping(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    toggleSelect(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    undo(): unknown;

    /** @todo Documentation incomplete. */
    unload(): unknown;

    /** @todo Documentation incomplete. */
    updateFileOpen(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    updateHistoryUI(): unknown;

    /** @todo Documentation incomplete. */
    updateSelection(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    virtualize(): unknown;

    /** @todo Documentation incomplete. */
    zoomBy(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    zoomToBbox(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    zoomToFit(): unknown;

    /** @todo Documentation incomplete. */
    zoomToSelection(): unknown;
}
