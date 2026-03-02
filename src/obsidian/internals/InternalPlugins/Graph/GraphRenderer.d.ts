import type { Point } from 'obsidian';
import type {
    Application,
    Container,
    ICanvas
} from 'pixi.js';
import type { Coords } from '../../../../@codemirror__view/internals/Coords.d.ts';
import type { GraphColor } from './GraphColor.d.ts';
import type { GraphColorAttributes } from './GraphColorAttributes.d.ts';
import type { GraphData } from './GraphData.d.ts';
import type { GraphForces } from './GraphForces.d.ts';
import type { GraphLink } from './GraphLink.d.ts';
import type { GraphNode } from './GraphNode.d.ts';
import type { GraphPluginInstanceOptions } from './GraphPluginInstanceOptions.d.ts';
import type { KeyboardActions } from './KeyboardActions.d.ts';
import type { PowerTag } from './PowerTag.d.ts';
import type { WorkerResults } from './WorkerResults.d.ts';

/**
 * Renderer for the graph view, managing PixiJS rendering, user interactions, and layout.
 * @public
 * @unofficial
 */
export interface GraphRenderer {
    /** General colors of the elements in the graph view, computed from the app CSS. */
    colors: Record<GraphColor, GraphColorAttributes>;

    /** `<div>` element containing the graph, with class `.view-content`. */
    containerEl: HTMLDivElement;

    /** Node currently being dragged, if any. */
    dragNode: GraphNode | null;

    /** Factor for the thickness of the links. */
    fLineSizeMult: number;

    /** Factor for the size of the nodes. */
    fNodeSizeMult: number;

    /** Indicates if arrows should be displayed. */
    fShowArrow: boolean;

    /** Text fade threshold. */
    fTextShowMult: number;

    /** Main container to which nodes, links and arrows are added. */
    hanger: Container;

    /** Height of the graph view, in pixel. */
    height: number;

    /** Whether to hide the power tag indicator in the graph view. */
    hidePowerTag: boolean;

    /** Node currently being highlighted, if any. */
    highlightNode: GraphNode | null;

    /** Number of idle frames. The simulation stops running at 60. */
    idleFrames: number;

    /** `<iframe>` element in which the graph is rendered. */
    iframeEl: HTMLIFrameElement;

    /** `<canvas>` element bound to the event system of `GraphRenderer.px` to capture events. */
    interactiveEl: HTMLCanvasElement;

    /** Keyboard action bindings for graph interaction. */
    keyboardActions: KeyboardActions;

    /** List of links currently rendered. */
    links: GraphLink[];

    /** Mouse x coordinate in the graph view. */
    mouseX: number | null;

    /** Mouse y coordinate in the graph view. */
    mouseY: number | null;

    /** Record of the nodes currently rendered, with `GraphNode.id` used as key. */
    nodeLookup: Record<string, GraphNode>;

    /** List of nodes currently rendered. */
    nodes: GraphNode[];

    /** Scale of the nodes based on the zoom level of the graph view. */
    nodeScale: number;

    /** Whether the user is currently panning the graph view. */
    panning: boolean;

    /** Current pan velocity along the x axis. */
    panvX: number;

    /** Current pan velocity along the y axis. */
    panvY: number;

    /** Current pan offset along the x axis. */
    panX: number;

    /** Current pan offset along the y axis. */
    panY: number;

    /** Power tag configuration for the graph view. */
    powerTag: PowerTag;

    /** PixiJS application rendering everything. */
    px: Application;

    /** Timer (request ID) associated to the requestAnimationFrame rendering the graph. */
    renderTimer: null | number;

    /** Current zoom level of the graph view, interpolated between the previous one and the `targetScale`. */
    scale: number;

    /** Target zoom level of the graph view. */
    targetScale: number;

    /** Current alpha of the nodes names based on the graph scale. */
    textAlpha: number;

    /** Current visible viewport bounds of the graph view. */
    viewport: Coords;

    /** Width of the graph view, in pixel. */
    width: number;

    /** Web Worker thread running the graph simulation. */
    worker: Worker;

    /** Results received from the graph simulation worker. */
    workerResults: WorkerResults;

    /** X coordinate of the zoom action. */
    zoomCenterX: number;

    /** Y coordinate of the zoom action. */
    zoomCenterY: number;

    /**
     * Specify that the renderer has changed and needs to be rendered again.
     */
    changed(): void;

    /** Destroy the renderer and release all resources. */
    destroy(): void;

    /** Destroy all the graphics of the graph. */
    destroyGraphics(): void;

    /** Capture a screenshot of the graph with the background included. */
    getBackgroundScreenshot(): HTMLCanvasElement;

    /** Returns the currently highlighted node, if any. */
    getHighlightNode(): GraphNode | null;

    /** Capture a screenshot of the graph with a transparent background. */
    getTransparentScreenshot(): ICanvas;

    /** Initialize all the graphics of the graph. */
    initGraphics(): void;

    /** Called when the graph iframe finishes loading. */
    onIframeLoad(): void;

    /** Called when the graph iframe is unloaded. */
    onIframeUnload(): void;

    /** Handle mouse movement over the graph view. */
    onMouseMove(evt: MouseEvent): void;

    /** Handle a click on a graph node. */
    onNodeClick(evt: MouseEvent, id: string, type: string): void;

    /** Handle hover over a graph node. */
    onNodeHover(evt: MouseEvent, id: string, type: string): void;

    /** Handle a right-click on a graph node. */
    onNodeRightClick(evt: MouseEvent, id: string, type: string): void;

    /** Handle the pointer leaving a graph node. */
    onNodeUnhover(): void;

    /** Handle a pointer down event on the graph. */
    onPointerDown(renderer: GraphRenderer, evt: PointerEvent): void;

    /** Handle the pointer leaving the graph view. */
    onPointerOut(): void;

    /** Handle the pointer entering the graph view. */
    onPointerOver(renderer: GraphRenderer, evt: PointerEvent): void;

    /** Handle a resize of the graph container. */
    onResize(): void;

    /** Handle a wheel (scroll/zoom) event on the graph view. */
    onWheel(evt: WheelEvent): void;

    /** Queue a render frame to be executed on the next animation frame. */
    queueRender(): void;

    /** Callback invoked on each render frame. */
    renderCallback(): void;

    /** Reset the pan offset to the origin. */
    resetPan(): void;

    /** Set the graph data (nodes and links) to render. */
    setData(data: GraphData): void;

    /** Set the force simulation parameters. */
    setForces(forces: GraphForces): void;

    /** Set the pan offset to the given coordinates. */
    setPan(panX: number, panY: number): void;

    /** Set the rendering options for the graph view. */
    setRenderOptions(options: GraphPluginInstanceOptions): void;

    /** Set the zoom scale of the graph view. */
    setScale(scale: number): void;

    /** Re-read CSS variables and update the graph colors accordingly. */
    testCSS(): void;

    /** Interpolate the current zoom level towards the target scale. */
    updateZoom(): void;

    /** Zoom the graph view to the given scale, centered on the given point. */
    zoomTo(scale: number, pointer: Point): void;
}
