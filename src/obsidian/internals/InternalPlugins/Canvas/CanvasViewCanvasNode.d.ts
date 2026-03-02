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

    /** Height of the node in canvas units. */
    height: number;

    /** Unique identifier for this node. */
    id: string;

    /** Whether the node has been initialized. */
    initialized: boolean;

    /** Whether the node's content is currently mounted in the DOM. */
    isContentMounted: boolean;

    /** Whether the node is currently in editing mode. */
    isEditing: boolean;

    /** Main node element for rendering. */
    nodeEl: HTMLDivElement;

    /** Placeholder element shown while the node content is loading. */
    placeholderEl: HTMLDivElement;

    /** The last rendered z-index value. */
    renderedZIndex: number;

    /** Whether the node needs to recalculate its size. */
    resizeDirty: boolean;

    /** Subpath within the linked file (e.g., heading or block reference). */
    subpath: string;

    /** Additional data properties not covered by known fields. */
    unknownData: CanvasViewCanvasNodeUnknownData;

    /** Width of the node in canvas units. */
    width: number;

    /** X coordinate of the node's top-left corner in canvas space. */
    x: number;

    /** Y coordinate of the node's top-left corner in canvas space. */
    y: number;

    /** Z-index stacking order of the node. */
    zIndex: number;

    /** Remove focus from the node. */
    blur(): unknown;

    /** Set focus on the node. */
    focus(): unknown;

    /** Get the serialized data for this node. */
    getData(): unknown;

    /** Initialize the file association for a file-type node. */
    initFile(): unknown;

    /** Initialize the node after construction. */
    initialize(): unknown;

    /** Handle the node's file receiving focus. */
    onFileFocus(): unknown;

    /** Handle click events on the node's label. */
    onLabelClick(arg1: unknown): unknown;

    /** Handle double-click events on the node's label. */
    onLabelDblClick(arg1: unknown): unknown;

    /** Handle pointer down events on the node. */
    onPointerdown(arg1: unknown): unknown;

    /** Render the node to the canvas. */
    render(): unknown;

    /** Set the serialized data for this node. */
    setData(arg1: unknown): unknown;

    /** Set the file associated with this node. */
    setFile(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** Set the file path for this node. */
    setFilePath(arg1: unknown, arg2: unknown): unknown;

    /** Show the context menu for this node. */
    showMenu(arg1: unknown): unknown;

    /** Update the rendering breakpoint based on the node's current size. */
    updateBreakpoint(arg1: unknown): unknown;

    /** Update the displayed label text of the node. */
    updateNodeLabel(arg1: unknown): unknown;
}
