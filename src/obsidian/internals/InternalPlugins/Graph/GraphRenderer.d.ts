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

/** @public @unofficial */
export interface GraphRenderer {
    /** @internal */
    colors: Record<GraphColor, GraphColorAttributes>;
    containerEl: HTMLDivElement;
    /** @internal */
    dragNode: GraphNode | null;
    /** @internal */
    fLineSizeMult: number;
    /** @internal */
    fNodeSizeMult: number;
    fShowArrow: boolean;
    fTextShowMult: number;
    /** @internal */
    hanger: Container;
    /** @internal */
    height: number;
    hidePowerTag: boolean;
    highlightNode: GraphNode | null;
    /** @internal */
    idleFrames: number;
    /** @internal */
    iframeEl: HTMLIFrameElement;
    /** @internal */
    interactiveEl: HTMLCanvasElement;
    keyboardActions: KeyboardActions;
    /** @internal */
    links: GraphLink[];
    mouseX: null;
    mouseY: null;
    nodeLookup: Record<string, GraphNode>;
    /** @internal */
    nodes: GraphNode[];
    /** @internal */
    nodeScale: number;
    panning: boolean;
    panvX: number;
    panvY: number;
    /** @internal */
    panX: number;
    /** @internal */
    panY: number;
    powerTag: PowerTag;
    /** @internal */
    px: Application;
    renderTimer: null | number;
    /** @internal */
    scale: number;
    /** @internal */
    targetScale: number;
    textAlpha: number;
    /** @internal */
    viewport: Coords;
    /** @internal */
    width: number;
    /** @internal */
    worker: Worker;
    workerResults: WorkerResults;
    /** @internal */
    zoomCenterX: number;
    /** @internal */
    zoomCenterY: number;

    /**
     * Specify that the renderer has changed and needs to be rendered again
     */
    changed(): void;
    destroy(): void;
    /** @internal */
    destroyGraphics(): void;
    getBackgroundScreenshot(): HTMLCanvasElement;
    /** @internal */
    getHighlightNode(): GraphNode | null;
    getTransparentScreenshot(): ICanvas;
    /** @internal */
    initGraphics(): void;
    onIframeLoad(): void;
    onIframeUnload(): void;
    onMouseMove(evt: MouseEvent): void;
    onNodeClick(evt: MouseEvent, id: string, type: string): void;
    onNodeHover(evt: MouseEvent, id: string, type: string): void;
    onNodeRightClick(evt: MouseEvent, id: string, type: string): void;
    onNodeUnhover(): void;
    onPointerDown(renderer: GraphRenderer, evt: PointerEvent): void;
    onPointerOut(): void;
    onPointerOver(renderer: GraphRenderer, evt: PointerEvent): void;
    onResize(): void;
    onWheel(evt: WheelEvent): void;
    queueRender(): void;
    /** @internal */
    renderCallback(): void;
    resetPan(): void;
    setData(data: GraphData): void;
    setForces(forces: GraphForces): void;
    /** @internal */
    setPan(panX: number, panY: number): void;
    setRenderOptions(options: GraphPluginInstanceOptions): void;
    /** @internal */
    setScale(scale: number): void;
    testCSS(): void;
    updateZoom(): void;
    zoomTo(scale: number, pointer: Pointer): void;
}
