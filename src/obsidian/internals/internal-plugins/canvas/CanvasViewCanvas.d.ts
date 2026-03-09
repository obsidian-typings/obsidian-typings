import type {
  App,
  Debouncer,
  Point
} from 'obsidian';
import type { MapOfSets } from '../../collections/MapOfSets.d.ts';
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
 * Main canvas controller that manages rendering, selection, drag, zoom, pan, nodes, and edges for the canvas view.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvas {
  /** Reference to the Obsidian app instance. */
  app: App;

  /** SVG pattern element used for rendering the canvas background grid. */
  backgroundPatternEl: SVGPatternElement;

  /** Container element for canvas control buttons (zoom, undo/redo, etc.). */
  canvasControlsEl: HTMLDivElement;

  /** Main canvas container element. */
  canvasEl: HTMLDivElement;

  /** Extended rectangle representing the canvas bounds. */
  canvasRect: CanvasRectEx;

  /** Container element for the card creation menu. */
  cardMenuEl: HTMLDivElement;

  /** Configuration settings for the canvas view. */
  config: CanvasViewConfig;

  /** Serialized canvas data containing nodes and edges. */
  data: CanvasViewData;

  /** Set of items that have been modified and need saving. */
  dirty: Set<unknown>;

  /** SVG container element for edge lines. */
  edgeContainerEl: SVGElement;

  /** SVG container element for edge endpoint markers. */
  edgeEndContainerEl: SVGElement;

  /** Mapping of edges to their source nodes. */
  edgeFrom: MapOfSets<CanvasViewCanvasEdge, CanvasViewCanvasNode>;

  /** Spatial index (R-tree) for efficient edge hit-testing. */
  edgeIndex: EdgeIndex;

  /** Map of all edges on the canvas, keyed by edge ID. */
  edges: Map<string, CanvasViewCanvasEdge>;

  /** Mapping of edges to their target nodes. */
  edgeTo: MapOfSets<CanvasViewCanvasEdge, CanvasViewCanvasNode>;

  /** Whether to finish the current viewport animation on the next frame. */
  finishViewportAnimation: boolean;

  /** Current animation frame request ID. */
  frame: number;

  /** Animation frame window reference, null when not animating. */
  frameWin: null;

  /** Spacing between grid lines in pixels. */
  gridSpacing: number;

  /** Undo/redo history manager for canvas state. */
  history: CanvasViewHistory;

  /** Whether the user is currently dragging on the canvas. */
  isDragging: boolean;

  /** Whether the spacebar is currently held (for pan mode). */
  isHoldingSpace: boolean;

  /** Map of currently pressed keyboard keys. */
  keys: Object;

  /** Set of edges that were visible in the viewport on the last render frame. */
  lastEdgesInViewport: Set<CanvasViewCanvasEdge>;

  /** Set of nodes that were visible in the viewport on the last render frame. */
  lastNodesInViewport: Set<CanvasViewCanvasNode>;

  /** Context menu and toolbar for the canvas. */
  menu: CanvasMenu;

  /** Set of items that have been moved and need re-indexing. */
  moved: Set<unknown>;

  /** Element used for dragging/moving the canvas viewport. */
  moverEl: HTMLDivElement;

  /** Spatial index (R-tree) for efficient node hit-testing. */
  nodeIndex: EdgeIndex;

  /** Layer handling user interactions with nodes (resize, connect, etc.). */
  nodeInteractionLayer: NodeInteractionLayer;

  /** Map of all nodes on the canvas, keyed by node ID. */
  nodes: Map<string, CanvasViewCanvasNode>;

  /** Optional configuration options for the canvas. */
  options?: unknown;

  /** Counter for pausing animation frames. */
  pauseAnimation: number;

  /** Current pointer position in canvas coordinates. */
  pointer: Point;

  /** Animation frame request ID for pointer tracking. */
  pointerFrame: number;

  /** Pointer frame window reference, null when not tracking. */
  pointerFrameWin: null;

  /** Button element for opening the quick settings menu. */
  quickSettingsButton: HTMLDivElement;

  /** Whether the canvas is in read-only mode. */
  readonly: boolean;

  /** Button element for the redo action. */
  redoBtnEl: HTMLDivElement;

  /** Debounced function to push the current state to history. */
  requestPushHistory: Debouncer<[], unknown>;

  /** Debounced function to update the file open state. */
  requestUpdateFileOpen: Debouncer<[], unknown>;

  /** Current zoom scale factor of the canvas viewport. */
  scale: number;

  /** Whether the canvas is currently being screenshotted. */
  screenshotting: boolean;

  /** Set of currently selected nodes and edges. */
  selection: Set<Selection>;

  /** Whether the selection has changed since the last update. */
  selectionChanged: boolean;

  /** Distance threshold for snapping behavior. */
  snapDistance?: unknown;

  /** Previously stale selection, null when selection is current. */
  staleSelection: null;

  /** Target X translation for viewport animation. */
  tx: number;

  /** Target Y translation for viewport animation. */
  ty: number;

  /** Target zoom level for viewport animation. */
  tZoom: number;

  /** Button element for the undo action. */
  undoBtnEl: HTMLDivElement;

  /** Reference to the parent CanvasView. */
  view: CanvasView;

  /** Whether the viewport has changed since the last render frame. */
  viewportChanged: boolean;

  /** Whether the canvas was animating on the previous frame. */
  wasAnimating: boolean;

  /** Outermost wrapper element for the canvas. */
  wrapperEl: HTMLDivElement;

  /** Current X offset of the viewport in canvas coordinates. */
  x: number;

  /** Current Y offset of the viewport in canvas coordinates. */
  y: number;

  /** Counter for assigning z-index values to nodes. */
  zIndexCounter: number;

  /** Current zoom level of the viewport. */
  zoom: number;

  /** Zoom level threshold for switching rendering detail levels. */
  zoomBreakpoint?: unknown;

  /** Center point for zoom operations, null when not zooming. */
  zoomCenter: null;

  /** Whether a zoom-to-fit operation is queued for the next frame. */
  zoomToFitQueued: boolean;

  /**
   * Add an edge to the canvas.
   *
   * @returns The added edge.
   */
  addEdge(arg1: unknown): unknown;

  /**
   * Add a node to the canvas.
   *
   * @returns The added node.
   */
  addNode(arg1: unknown): unknown;

  /**
   * Apply a history state to restore the canvas to a previous state.
   *
   * @returns The result of applying the history state.
   */
  applyHistory(arg1: unknown): unknown;

  /**
   * Cancel the current pending animation frame.
   *
   * @returns The result of canceling the frame.
   */
  cancelFrame(): unknown;

  /**
   * Check whether snapping is currently possible for the given context.
   *
   * @returns Whether snapping is possible.
   */
  canSnap(arg1: unknown): unknown;

  /**
   * Remove all nodes and edges from the canvas.
   *
   * @returns The result of clearing the canvas.
   */
  clear(): unknown;

  /**
   * Clear all active snap point guides.
   *
   * @returns The result of clearing snap points.
   */
  clearSnapPoints(): unknown;

  /**
   * Clone canvas data, creating duplicates of the specified items at the given offset.
   *
   * @returns The cloned canvas data.
   */
  cloneData(arg1: unknown, arg2: unknown): unknown;

  /**
   * Create a new file-type node on the canvas.
   *
   * @returns The created file node.
   */
  createFileNode(arg1: unknown): unknown;

  /**
   * Create multiple file-type nodes on the canvas.
   *
   * @returns The created file nodes.
   */
  createFileNodes(arg1: unknown, arg2: unknown): unknown;

  /**
   * Create a new group node on the canvas.
   *
   * @returns The created group node.
   */
  createGroupNode(arg1: unknown): unknown;

  /**
   * Create a new link/URL node on the canvas.
   *
   * @returns The created link node.
   */
  createLinkNode(arg1: unknown): unknown;

  /**
   * Create a placeholder node for drag-and-drop operations.
   *
   * @returns The created placeholder node.
   */
  createPlaceholder(): unknown;

  /**
   * Create a new text node on the canvas.
   *
   * @returns The created text node.
   */
  createTextNode(arg1: unknown): unknown;

  /**
   * Delete all currently selected nodes and edges.
   *
   * @returns The result of deleting the selection.
   */
  deleteSelection(): unknown;

  /**
   * Remove an item from the current selection.
   *
   * @returns The result of deselecting the item.
   */
  deselect(arg1: unknown): unknown;

  /**
   * Clear the entire selection.
   *
   * @returns The result of clearing the selection.
   */
  deselectAll(): unknown;

  /**
   * Convert a canvas position to DOM pixel coordinates.
   *
   * @returns The DOM pixel coordinates.
   */
  domFromPos(arg1: unknown): unknown;

  /**
   * Convert client (screen) coordinates to DOM pixel coordinates.
   *
   * @returns The DOM pixel coordinates.
   */
  domPosFromClient(arg1: unknown): unknown;

  /**
   * Convert a DOM event's position to DOM pixel coordinates.
   *
   * @returns The DOM pixel coordinates.
   */
  domPosFromEvt(arg1: unknown): unknown;

  /**
   * Handle dragging a temporary node during creation.
   *
   * @returns The result of dragging the temporary node.
   */
  dragTempNode(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

  /**
   * Stop rendering snap point guide lines.
   *
   * @returns The result of ending snap point rendering.
   */
  endSnapPointRendering(): unknown;

  /**
   * Generate a high-definition image of the canvas.
   *
   * @returns The generated HD image.
   */
  generateHDImage(): Promise<unknown>;

  /**
   * Get all nodes that contain the specified bounding box or point.
   *
   * @returns The containing nodes.
   */
  getContainingNodes(arg1: unknown): unknown;

  /**
   * Get the serialized canvas data.
   *
   * @returns The canvas data.
   */
  getData(): unknown;

  /**
   * Get all edges connected to the specified node.
   *
   * @returns The edges connected to the node.
   */
  getEdgesForNode(arg1: unknown): unknown;

  /**
   * Get all edges that intersect the specified bounding box.
   *
   * @returns The intersecting edges.
   */
  getIntersectingEdges(arg1: unknown): unknown;

  /**
   * Get all nodes that intersect the specified bounding box.
   *
   * @returns The intersecting nodes.
   */
  getIntersectingNodes(arg1: unknown): unknown;

  /**
   * Get serialized data for the current selection.
   *
   * @returns The selection data.
   */
  getSelectionData(arg1: unknown): unknown;

  /**
   * Calculate snap alignment guides for the given position and dimensions.
   *
   * @returns The snap alignment data.
   */
  getSnapping(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

  /**
   * Get the current viewport state (position, zoom).
   *
   * @returns The viewport state.
   */
  getState(): unknown;

  /**
   * Get the bounding box of the current viewport in canvas coordinates.
   *
   * @returns The viewport bounding box.
   */
  getViewportBBox(): unknown;

  /**
   * Get all nodes currently visible within the viewport.
   *
   * @returns The viewport nodes.
   */
  getViewportNodes(arg1: unknown): unknown;

  /**
   * Get the next available z-index value.
   *
   * @returns The next z-index value.
   */
  getZIndex(): unknown;

  /**
   * Handle a copy event for the current selection.
   *
   * @returns The result of handling the copy event.
   */
  handleCopy(arg1: unknown): unknown;

  /**
   * Handle a cut event for the current selection.
   *
   * @returns The result of handling the cut event.
   */
  handleCut(arg1: unknown): unknown;

  /**
   * Handle drag-to-select (rubber band selection) interaction.
   *
   * @returns The result of handling the drag-to-select.
   */
  handleDragToSelect(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

  /**
   * Handle drag interaction with viewport panning.
   *
   * @returns The result of handling the drag with pan.
   */
  handleDragWithPan(arg1: unknown, arg2: unknown): unknown;

  /**
   * Handle pointer down event on the mover element.
   *
   * @returns The result of handling the pointer down.
   */
  handleMoverPointerdown(arg1: unknown): unknown;

  /**
   * Handle a paste event to add items to the canvas.
   *
   * @returns The result of handling the paste event.
   */
  handlePaste(arg1: unknown): unknown;

  /**
   * Handle dragging the current selection.
   *
   * @returns The result of handling the selection drag.
   */
  handleSelectionDrag(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

  /**
   * Test whether a point hits a specific node.
   *
   * @returns Whether the point hits the node.
   */
  hitTestNode(arg1: unknown, arg2: unknown): unknown;

  /**
   * Import canvas data from an external source.
   *
   * @returns The result of importing the data.
   */
  importData(arg1: unknown, arg2: unknown): unknown;

  /**
   * Perform a hit test for interactive elements at the given position.
   *
   * @returns The hit interactive element, if any.
   */
  interactionHitTest(arg1: unknown): unknown;

  /**
   * Load and initialize the canvas from saved data.
   *
   * @returns The result of loading the canvas.
   */
  load(): unknown;

  /**
   * Mark an item as dirty (needing to be saved).
   *
   * @returns The result of marking the item as dirty.
   */
  markDirty(arg1: unknown): unknown;

  /**
   * Mark an item as having been moved (needing re-indexing).
   *
   * @returns The result of marking the item as moved.
   */
  markMoved(arg1: unknown): unknown;

  /**
   * Mark the viewport as changed, triggering a re-render.
   *
   * @returns The result of marking the viewport as changed.
   */
  markViewportChanged(): unknown;

  /**
   * Nudge the current selection by the specified offset.
   *
   * @returns The result of nudging the selection.
   */
  nudgeSelection(arg1: unknown, arg2: unknown): unknown;

  /**
   * Handle context menu event on the canvas background.
   *
   * @returns The result of handling the context menu event.
   */
  onContextMenu(arg1: unknown): unknown;

  /**
   * Handle double-click event on the canvas.
   *
   * @returns The result of handling the double-click.
   */
  onDoubleClick(arg1: unknown): unknown;

  /**
   * Handle global keydown events.
   *
   * @returns The result of handling the keydown event.
   */
  onGlobalKeydown(arg1: unknown): unknown;

  /**
   * Handle global keyup events.
   *
   * @returns The result of handling the keyup event.
   */
  onGlobalKeyup(arg1: unknown): unknown;

  /**
   * Handle keydown events on the canvas.
   *
   * @returns The result of handling the keydown event.
   */
  onKeydown(arg1: unknown): unknown;

  /**
   * Handle pointer down events on the canvas.
   *
   * @returns The result of handling the pointer down event.
   */
  onPointerdown(arg1: unknown): unknown;

  /**
   * Handle pointer move events on the canvas.
   *
   * @returns The result of handling the pointer move event.
   */
  onPointermove(arg1: unknown): unknown;

  /**
   * Handle priority pointer down events (processed before other handlers).
   *
   * @returns The result of handling the priority pointer down event.
   */
  onPriorityPointerdown(arg1: unknown): unknown;

  /**
   * Handle canvas container resize events.
   *
   * @returns The result of handling the resize event.
   */
  onResize(): unknown;

  /**
   * Handle context menu event on the current selection.
   *
   * @returns The result of handling the selection context menu.
   */
  onSelectionContextMenu(arg1: unknown): unknown;

  /**
   * Handle touch start events on the canvas.
   *
   * @returns The result of handling the touch event.
   */
  onTouchdown(arg1: unknown): unknown;

  /**
   * Handle mouse wheel events for zooming or panning.
   *
   * @returns The result of handling the wheel event.
   */
  onWheel(arg1: unknown): unknown;

  /**
   * Override the current history entry with the latest state.
   *
   * @returns The result of overriding the history.
   */
  overrideHistory(): unknown;

  /**
   * Pan the viewport by the specified delta.
   *
   * @returns The result of panning the viewport.
   */
  panBy(arg1: unknown, arg2: unknown): unknown;

  /**
   * Pan the viewport so the specified bounding box is visible.
   *
   * @returns The result of panning into view.
   */
  panIntoView(arg1: unknown, arg2: unknown): unknown;

  /**
   * Pan the viewport to the specified position.
   *
   * @returns The result of panning the viewport.
   */
  panTo(arg1: unknown, arg2: unknown): unknown;

  /**
   * Get the center position of the current viewport.
   *
   * @returns The center position of the viewport.
   */
  posCenter(): unknown;

  /**
   * Convert client (screen) coordinates to canvas coordinates.
   *
   * @returns The canvas coordinates.
   */
  posFromClient(arg1: unknown): unknown;

  /**
   * Convert DOM pixel coordinates to canvas coordinates.
   *
   * @returns The canvas coordinates.
   */
  posFromDom(arg1: unknown): unknown;

  /**
   * Convert a DOM event's position to canvas coordinates.
   *
   * @returns The canvas coordinates.
   */
  posFromEvt(arg1: unknown): unknown;

  /**
   * Check whether a position is within the current viewport.
   *
   * @returns Whether the position is in the viewport.
   */
  posInViewport(arg1: unknown): unknown;

  /**
   * Push the current canvas state onto the undo history stack.
   *
   * @returns The result of pushing the history state.
   */
  pushHistory(arg1: unknown): unknown;

  /**
   * Redo the last undone action.
   *
   * @returns The result of the redo operation.
   */
  redo(): unknown;

  /**
   * Remove an edge from the canvas.
   *
   * @returns The result of removing the edge.
   */
  removeEdge(arg1: unknown): unknown;

  /**
   * Remove a node from the canvas.
   *
   * @returns The result of removing the node.
   */
  removeNode(arg1: unknown): unknown;

  /**
   * Render snap point guide lines for alignment.
   *
   * @returns The result of rendering snap points.
   */
  renderSnapPoints(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

  /**
   * Request an animation frame for rendering.
   *
   * @returns The animation frame request ID.
   */
  requestFrame(arg1: unknown): unknown;

  /**
   * Request saving the canvas data to disk.
   *
   * @returns The result of requesting save.
   */
  requestSave(arg1: unknown): unknown;

  /**
   * Force a re-render of all items in the viewport.
   *
   * @returns The result of re-rendering the viewport.
   */
  rerenderViewport(): unknown;

  /**
   * Add an item to the current selection.
   *
   * @returns The result of selecting the item.
   */
  select(arg1: unknown): unknown;

  /**
   * Select all nodes and edges on the canvas.
   *
   * @returns The result of selecting all items.
   */
  selectAll(arg1: unknown): unknown;

  /**
   * Select only the specified item, deselecting everything else.
   *
   * @returns The result of selecting only the item.
   */
  selectOnly(arg1: unknown): unknown;

  /**
   * Set the canvas data, replacing existing nodes and edges.
   *
   * @returns The result of setting the data.
   */
  setData(arg1: unknown): unknown;

  /**
   * Set the dragging state of the canvas.
   *
   * @returns The result of setting the dragging state.
   */
  setDragging(arg1: unknown): unknown;

  /**
   * Set the read-only state of the canvas.
   *
   * @returns The result of setting the read-only state.
   */
  setReadonly(arg1: unknown): unknown;

  /**
   * Set the viewport state (position, zoom).
   *
   * @returns The result of setting the state.
   */
  setState(arg1: unknown): unknown;

  /**
   * Set the viewport position and zoom level.
   *
   * @returns The result of setting the viewport.
   */
  setViewport(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

  /**
   * Show the node creation menu at the specified position.
   *
   * @returns The result of showing the creation menu.
   */
  showCreationMenu(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

  /**
   * Show the quick settings menu for canvas options.
   *
   * @returns The result of showing the quick settings menu.
   */
  showQuickSettingsMenu(arg1: unknown): unknown;

  /**
   * Perform a smart zoom operation (toggle between zoom levels).
   *
   * @returns The result of the smart zoom.
   */
  smartZoom(arg1: unknown): unknown;

  /**
   * Capture a screenshot of the canvas.
   *
   * @returns The captured screenshot.
   */
  takeScreenshot(arg1: unknown, arg2: unknown): Promise<unknown>;

  /**
   * Toggle grid snapping on or off.
   *
   * @returns The result of toggling grid snapping.
   */
  toggleGridSnapping(arg1: unknown): unknown;

  /**
   * Toggle object-to-object snapping on or off.
   *
   * @returns The result of toggling object snapping.
   */
  toggleObjectSnapping(arg1: unknown): unknown;

  /**
   * Toggle the selection state of an item.
   *
   * @returns The result of toggling the selection.
   */
  toggleSelect(arg1: unknown): unknown;

  /**
   * Undo the last action.
   *
   * @returns The result of the undo operation.
   */
  undo(): unknown;

  /**
   * Unload and clean up the canvas resources.
   *
   * @returns The result of unloading the canvas.
   */
  unload(): unknown;

  /**
   * Update the file open state for workspace tracking.
   *
   * @returns The result of updating the file open state.
   */
  updateFileOpen(arg1: unknown): unknown;

  /**
   * Update the undo/redo button enabled states.
   *
   * @returns The result of updating the history UI.
   */
  updateHistoryUI(): unknown;

  /**
   * Update the visual state of the current selection.
   *
   * @returns The result of updating the selection.
   */
  updateSelection(arg1: unknown): unknown;

  /**
   * Virtualize off-screen nodes to improve performance.
   *
   * @returns The result of virtualizing nodes.
   */
  virtualize(): unknown;

  /**
   * Zoom the viewport by a delta amount at the specified center point.
   *
   * @returns The result of zooming.
   */
  zoomBy(arg1: unknown, arg2: unknown): unknown;

  /**
   * Zoom the viewport to fit the specified bounding box.
   *
   * @returns The result of zooming to the bounding box.
   */
  zoomToBbox(arg1: unknown): unknown;

  /**
   * Zoom the viewport to fit all canvas content.
   *
   * @returns The result of zooming to fit.
   */
  zoomToFit(): unknown;

  /**
   * Zoom the viewport to fit the current selection.
   *
   * @returns The result of zooming to the selection.
   */
  zoomToSelection(): unknown;
}
