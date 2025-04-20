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
 * @public
 * @unofficial
 */
export interface GraphRenderer {
    /**
     * @todo Documentation incomplete.
     */
    colors: Record<GraphColor, GraphColorAttributes>;

    /**
     * @todo Documentation incomplete.
     */
    containerEl: HTMLDivElement;

    /**
     * @todo Documentation incomplete.
     */
    dragNode: GraphNode | null;

    /**
     * @todo Documentation incomplete.
     */
    fLineSizeMult: number;

    /**
     * @todo Documentation incomplete.
     */
    fNodeSizeMult: number;

    /**
     * @todo Documentation incomplete.
     */
    fShowArrow: boolean;

    /**
     * @todo Documentation incomplete.
     */
    fTextShowMult: number;

    /**
     * @todo Documentation incomplete.
     */
    hanger: Container;

    /**
     * @todo Documentation incomplete.
     */
    height: number;

    /**
     * @todo Documentation incomplete.
     */
    hidePowerTag: boolean;

    /**
     * @todo Documentation incomplete.
     */
    highlightNode: GraphNode | null;

    /**
     * @todo Documentation incomplete.
     */
    idleFrames: number;

    /**
     * @todo Documentation incomplete.
     */
    iframeEl: HTMLIFrameElement;

    /**
     * @todo Documentation incomplete.
     */
    interactiveEl: HTMLCanvasElement;

    /**
     * @todo Documentation incomplete.
     */
    keyboardActions: KeyboardActions;

    /**
     * @todo Documentation incomplete.
     */
    links: GraphLink[];

    /**
     * @todo Documentation incomplete.
     */
    mouseX: null;

    /**
     * @todo Documentation incomplete.
     */
    mouseY: null;

    /**
     * @todo Documentation incomplete.
     */
    nodeLookup: Record<string, GraphNode>;

    /**
     * @todo Documentation incomplete.
     */
    nodes: GraphNode[];

    /**
     * @todo Documentation incomplete.
     */
    nodeScale: number;

    /**
     * @todo Documentation incomplete.
     */
    panning: boolean;

    /**
     * @todo Documentation incomplete.
     */
    panvX: number;

    /**
     * @todo Documentation incomplete.
     */
    panvY: number;

    /**
     * @todo Documentation incomplete.
     */
    panX: number;

    /**
     * @todo Documentation incomplete.
     */
    panY: number;

    /**
     * @todo Documentation incomplete.
     */
    powerTag: PowerTag;

    /**
     * @todo Documentation incomplete.
     */
    px: Application;

    /**
     * @todo Documentation incomplete.
     */
    renderTimer: null | number;

    /**
     * @todo Documentation incomplete.
     */
    scale: number;

    /**
     * @todo Documentation incomplete.
     */
    targetScale: number;

    /**
     * @todo Documentation incomplete.
     */
    textAlpha: number;

    /**
     * @todo Documentation incomplete.
     */
    viewport: Coords;

    /**
     * @todo Documentation incomplete.
     */
    width: number;

    /**
     * @todo Documentation incomplete.
     */
    worker: Worker;

    /**
     * @todo Documentation incomplete.
     */
    workerResults: WorkerResults;

    /**
     * @todo Documentation incomplete.
     */
    zoomCenterX: number;

    /**
     * @todo Documentation incomplete.
     */
    zoomCenterY: number;

    /**
     * Specify that the renderer has changed and needs to be rendered again.
     */
    changed(): void;

    /**
     * @todo Documentation incomplete.
     */
    destroy(): void;

    /**
     * @todo Documentation incomplete.
     */
    destroyGraphics(): void;

    /**
     * @todo Documentation incomplete.
     */
    getBackgroundScreenshot(): HTMLCanvasElement;

    /**
     * @todo Documentation incomplete.
     */
    getHighlightNode(): GraphNode | null;

    /**
     * @todo Documentation incomplete.
     */
    getTransparentScreenshot(): ICanvas;

    /**
     * @todo Documentation incomplete.
     */
    initGraphics(): void;

    /**
     * @todo Documentation incomplete.
     */
    onIframeLoad(): void;

    /**
     * @todo Documentation incomplete.
     */
    onIframeUnload(): void;

    /**
     * @todo Documentation incomplete.
     */
    onMouseMove(evt: MouseEvent): void;

    /**
     * @todo Documentation incomplete.
     */
    onNodeClick(evt: MouseEvent, id: string, type: string): void;

    /**
     * @todo Documentation incomplete.
     */
    onNodeHover(evt: MouseEvent, id: string, type: string): void;

    /**
     * @todo Documentation incomplete.
     */
    onNodeRightClick(evt: MouseEvent, id: string, type: string): void;

    /**
     * @todo Documentation incomplete.
     */
    onNodeUnhover(): void;

    /**
     * @todo Documentation incomplete.
     */
    onPointerDown(renderer: GraphRenderer, evt: PointerEvent): void;

    /**
     * @todo Documentation incomplete.
     */
    onPointerOut(): void;

    /**
     * @todo Documentation incomplete.
     */
    onPointerOver(renderer: GraphRenderer, evt: PointerEvent): void;

    /**
     * @todo Documentation incomplete.
     */
    onResize(): void;

    /**
     * @todo Documentation incomplete.
     */
    onWheel(evt: WheelEvent): void;

    /**
     * @todo Documentation incomplete.
     */
    queueRender(): void;

    /**
     * @todo Documentation incomplete.
     */
    renderCallback(): void;

    /**
     * @todo Documentation incomplete.
     */
    resetPan(): void;

    /**
     * @todo Documentation incomplete.
     */
    setData(data: GraphData): void;

    /**
     * @todo Documentation incomplete.
     */
    setForces(forces: GraphForces): void;

    /**
     * @todo Documentation incomplete.
     */
    setPan(panX: number, panY: number): void;

    /**
     * @todo Documentation incomplete.
     */
    setRenderOptions(options: GraphPluginInstanceOptions): void;

    /**
     * @todo Documentation incomplete.
     */
    setScale(scale: number): void;

    /**
     * @todo Documentation incomplete.
     */
    testCSS(): void;

    /**
     * @todo Documentation incomplete.
     */
    updateZoom(): void;

    /**
     * @todo Documentation incomplete.
     */
    zoomTo(scale: number, pointer: Pointer): void;
}
