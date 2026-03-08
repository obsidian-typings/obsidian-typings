import type {
    App,
    TFile
} from 'obsidian';
import type { WidgetEditorView } from '../../WidgetEditorView.d.ts';
import type { BBox } from './BBox.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';
import type { CanvasViewCanvasNodeBase } from './CanvasViewCanvasNodeBase.d.ts';
import type { CanvasViewCanvasNodeUnknownData } from './CanvasViewCanvasNodeUnknownData.d.ts';

/**
 * Represents a node on the canvas with position, size, content, and connection capabilities.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasNode extends CanvasViewCanvasNodeBase {
    /** Whether this node should always remain loaded even when off-screen. */
    alwaysKeepLoaded: boolean;

    /** Reference to the Obsidian app instance. */
    app: App;

    /** Aspect ratio of the node (width / height). */
    aspectRatio: number;

    /** Bounding box of the node for spatial indexing. */
    bbox: BBox;

    /**
     * Remove focus from the node.
     *
     * @returns The result of removing focus.
     */
    blur(): unknown;

    /** Reference to the parent canvas instance. */
    canvas: CanvasViewCanvas;

    /** Child editor view for the node's content. */
    child: WidgetEditorView;

    /** Color of the node (CSS color string or preset name). */
    color: string;

    /** Outermost container element of the node. */
    containerEl: HTMLDivElement;

    /** Overlay element that blocks interaction with content when not editing. */
    contentBlockerEl: HTMLDivElement;

    /** Element containing the node's editable content. */
    contentEl: HTMLDivElement;

    /** Whether the node has been destroyed. */
    destroyed: boolean;

    /** Reference to the associated file, if this is a file node. */
    file: TFile;

    /** Path to the associated file, if this is a file node. */
    filePath: string;

    /**
     * Set focus on the node.
     *
     * @returns The result of focusing the node.
     */
    focus(): unknown;

    /**
     * Get the serialized data for this node.
     *
     * @returns The node data.
     */
    getData(): unknown;

    /** Height of the node in canvas units. */
    height: number;

    /** Unique identifier for this node. */
    id: string;

    /**
     * Initialize the file association for a file-type node.
     *
     * @returns The result of initializing the file.
     */
    initFile(): unknown;

    /**
     * Initialize the node after construction.
     *
     * @returns The result of initializing the node.
     */
    initialize(): unknown;

    /** Whether the node has been initialized. */
    initialized: boolean;

    /** Whether the node's content is currently mounted in the DOM. */
    isContentMounted: boolean;

    /** Whether the node is currently in editing mode. */
    isEditing: boolean;

    /** Main node element for rendering. */
    nodeEl: HTMLDivElement;

    /**
     * Handle the node's file receiving focus.
     *
     * @returns The result of handling the file focus.
     */
    onFileFocus(): unknown;

    /**
     * Handle click events on the node's label.
     *
     * @returns The result of handling the label click.
     */
    onLabelClick(arg1: unknown): unknown;

    /**
     * Handle double-click events on the node's label.
     *
     * @returns The result of handling the label double-click.
     */
    onLabelDblClick(arg1: unknown): unknown;

    /**
     * Handle pointer down events on the node.
     *
     * @returns The result of handling the pointer down.
     */
    onPointerdown(arg1: unknown): unknown;

    /** Placeholder element shown while the node content is loading. */
    placeholderEl: HTMLDivElement;

    /**
     * Render the node to the canvas.
     *
     * @returns The result of rendering the node.
     */
    render(): unknown;

    /** The last rendered z-index value. */
    renderedZIndex: number;

    /** Whether the node needs to recalculate its size. */
    resizeDirty: boolean;

    /**
     * Set the serialized data for this node.
     *
     * @returns The result of setting the data.
     */
    setData(arg1: unknown): unknown;

    /**
     * Set the file associated with this node.
     *
     * @returns The result of setting the file.
     */
    setFile(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /**
     * Set the file path for this node.
     *
     * @returns The result of setting the file path.
     */
    setFilePath(arg1: unknown, arg2: unknown): unknown;

    /**
     * Show the context menu for this node.
     *
     * @returns The result of showing the menu.
     */
    showMenu(arg1: unknown): unknown;

    /** Subpath within the linked file (e.g., heading or block reference). */
    subpath: string;

    /** Additional data properties not covered by known fields. */
    unknownData: CanvasViewCanvasNodeUnknownData;

    /**
     * Update the rendering breakpoint based on the node's current size.
     *
     * @returns The result of updating the breakpoint.
     */
    updateBreakpoint(arg1: unknown): unknown;

    /**
     * Update the displayed label text of the node.
     *
     * @returns The result of updating the node label.
     */
    updateNodeLabel(arg1: unknown): unknown;

    /** Width of the node in canvas units. */
    width: number;

    /** X coordinate of the node's top-left corner in canvas space. */
    x: number;

    /** Y coordinate of the node's top-left corner in canvas space. */
    y: number;

    /** Z-index stacking order of the node. */
    zIndex: number;
}
