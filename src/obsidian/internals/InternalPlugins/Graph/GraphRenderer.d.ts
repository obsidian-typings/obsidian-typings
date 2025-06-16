import type {
    Application,
    Container,
    ICanvas
} from 'pixi.js';
import type { Coords } from '../../../../@codemirror__view/internals/Coords.d.ts';
import type { Pointer } from '../../Pointer.d.ts';
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
 * @todo Documentation incomplete.
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

    /** @todo Documentation incomplete. */
    hidePowerTag: boolean;

    /** Node currently being highlighted, if any. */
    highlightNode: GraphNode | null;

    /** Number of idle frames. The simulation stops running at 60. */
    idleFrames: number;

    /** `<iframe>` element in which the graph is rendered. */
    iframeEl: HTMLIFrameElement;

    /** `<canvas>` element bound to the event system of `GraphRenderer.px` to capture events. */
    interactiveEl: HTMLCanvasElement;

    /** @todo Documentation incomplete. */
    keyboardActions: KeyboardActions;

    /** List of links currently rendered. */
    links: GraphLink[];

    /** Mouse x coordinate in the graph view. */
    mouseX: number | null;

    /** Mouse y coordinate in the graph view. */
    mouseY: number | null;

    /** Record of the nodes currently rendered, with `GraphNode.id` used as key. */
    nodeLookup: Record<string, GraphNode>;

    /** List of nodes currenly rendered. */
    nodes: GraphNode[];

    /** Scale of the nodes based on the zoom level of the graph view. */
    nodeScale: number;

    /** @todo Documentation incomplete. */
    panning: boolean;

    /** @todo Documentation incomplete. */
    panvX: number;

    /** @todo Documentation incomplete. */
    panvY: number;

    /** @todo Documentation incomplete. */
    panX: number;

    /** @todo Documentation incomplete. */
    panY: number;

    /** @todo Documentation incomplete. */
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

    /** @todo Documentation incomplete. */
    viewport: Coords;

    /** Widt of the graph view, in pixel. */
    width: number;

    /** Web Worker thread running the graph simulation. */
    worker: Worker;

    /** @todo Documentation incomplete. */
    workerResults: WorkerResults;

    /** X coordinate of the zoom action. */
    zoomCenterX: number;

    /** Y coordinate of the zoom action. */
    zoomCenterY: number;

    /**
     * Specify that the renderer has changed and needs to be rendered again.
     */
    changed(): void;

    /** @todo Documentation incomplete. */
    destroy(): void;

    /** Destroy all the graphics of the graph. */
    destroyGraphics(): void;

    /** @todo Documentation incomplete. */
    getBackgroundScreenshot(): HTMLCanvasElement;

    /** Returns the currently highlighted node, if any. */
    getHighlightNode(): GraphNode | null;

    /** @todo Documentation incomplete. */
    getTransparentScreenshot(): ICanvas;

    /** Initialize all the graphics of the graph. */
    initGraphics(): void;

    /** @todo Documentation incomplete. */
    onIframeLoad(): void;

    /** @todo Documentation incomplete. */
    onIframeUnload(): void;

    /** @todo Documentation incomplete. */
    onMouseMove(evt: MouseEvent): void;

    /** @todo Documentation incomplete. */
    onNodeClick(evt: MouseEvent, id: string, type: string): void;

    /** @todo Documentation incomplete. */
    onNodeHover(evt: MouseEvent, id: string, type: string): void;

    /** @todo Documentation incomplete. */
    onNodeRightClick(evt: MouseEvent, id: string, type: string): void;

    /** @todo Documentation incomplete. */
    onNodeUnhover(): void;

    /** @todo Documentation incomplete. */
    onPointerDown(renderer: GraphRenderer, evt: PointerEvent): void;

    /** @todo Documentation incomplete. */
    onPointerOut(): void;

    /** @todo Documentation incomplete. */
    onPointerOver(renderer: GraphRenderer, evt: PointerEvent): void;

    /** @todo Documentation incomplete. */
    onResize(): void;

    /** @todo Documentation incomplete. */
    onWheel(evt: WheelEvent): void;

    /** @todo Documentation incomplete. */
    queueRender(): void;

    /** @todo Documentation incomplete. */
    renderCallback(): void;

    /** @todo Documentation incomplete. */
    resetPan(): void;

    /** @todo Documentation incomplete. */
    setData(data: GraphData): void;

    /** @todo Documentation incomplete. */
    setForces(forces: GraphForces): void;

    /** @todo Documentation incomplete. */
    setPan(panX: number, panY: number): void;

    /** @todo Documentation incomplete. */
    setRenderOptions(options: GraphPluginInstanceOptions): void;

    /** @todo Documentation incomplete. */
    setScale(scale: number): void;

    /** @todo Documentation incomplete. */
    testCSS(): void;

    /** @todo Documentation incomplete. */
    updateZoom(): void;

    /** @todo Documentation incomplete. */
    zoomTo(scale: number, pointer: Pointer): void;
}
