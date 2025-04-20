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
    colors: Record<GraphColor, GraphColorAttributes>;
    containerEl: HTMLDivElement;
    dragNode: GraphNode | null;
    fLineSizeMult: number;
    fNodeSizeMult: number;
    fShowArrow: boolean;
    fTextShowMult: number;
    hanger: Container;
    height: number;
    hidePowerTag: boolean;
    highlightNode: GraphNode | null;
    idleFrames: number;
    iframeEl: HTMLIFrameElement;
    interactiveEl: HTMLCanvasElement;
    keyboardActions: KeyboardActions;
    links: GraphLink[];
    mouseX: null;
    mouseY: null;
    nodeLookup: Record<string, GraphNode>;
    nodes: GraphNode[];
    nodeScale: number;
    panning: boolean;
    panvX: number;
    panvY: number;
    panX: number;
    panY: number;
    powerTag: PowerTag;
    px: Application;
    renderTimer: null | number;
    scale: number;
    targetScale: number;
    textAlpha: number;
    viewport: Coords;
    width: number;
    worker: Worker;
    workerResults: WorkerResults;
    zoomCenterX: number;
    zoomCenterY: number;

    /**
     * Specify that the renderer has changed and needs to be rendered again.
     */
    changed(): void;
    destroy(): void;
    destroyGraphics(): void;
    getBackgroundScreenshot(): HTMLCanvasElement;
    getHighlightNode(): GraphNode | null;
    getTransparentScreenshot(): ICanvas;
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
    renderCallback(): void;
    resetPan(): void;
    setData(data: GraphData): void;
    setForces(forces: GraphForces): void;
    setPan(panX: number, panY: number): void;
    setRenderOptions(options: GraphPluginInstanceOptions): void;
    setScale(scale: number): void;
    testCSS(): void;
    updateZoom(): void;
    zoomTo(scale: number, pointer: Pointer): void;
}
