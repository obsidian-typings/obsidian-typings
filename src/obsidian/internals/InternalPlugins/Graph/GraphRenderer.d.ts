import {
    Application,
    Container
} from 'pixi.js';
import type { Coords } from '../../../../@codemirror__view/internals/Coords.d.ts';
import type { GraphColor } from './GraphColor.d.ts';
import type { GraphColorAttributes } from './GraphColorAttributes.d.ts';
import type { GraphLink } from './GraphLink.d.ts';
import type { GraphNode } from './GraphNode.d.ts';

/** @public */
export interface GraphRenderer {
    /** @internal */
    colors: Record<GraphColor, GraphColorAttributes>;
    /** @internal */
    dragNode: GraphNode | null;
    /** @internal */
    fLineSizeMult: number;
    /** @internal */
    fNodeSizeMult: number;
    /** @internal */
    hanger: Container;
    /** @internal */
    height: number;
    /** @internal */
    idleFrames: number;
    /** @internal */
    iframeEl: HTMLIFrameElement;
    /** @internal */
    interactiveEl: HTMLCanvasElement;
    /** @internal */
    links: GraphLink[];
    /** @internal */
    nodes: GraphNode[];
    /** @internal */
    nodeScale: number;
    /** @internal */
    panX: number;
    /** @internal */
    panY: number;
    /** @internal */
    px: Application;
    /** @internal */
    scale: number;
    /** @internal */
    targetScale: number;
    /** @internal */
    viewport: Coords;
    /** @internal */
    width: number;
    /** @internal */
    worker: Worker;
    /** @internal */
    zoomCenterX: number;
    /** @internal */
    zoomCenterY: number;

    /**
     * Specify that the renderer has changed and needs to be rendered again
     */
    changed(): unknown;
    /** @internal */
    destroyGraphics(): void;
    /** @internal */
    getHighlightNode(): GraphNode;
    /** @internal */
    initGraphics(): void;
    /** @internal */
    renderCallback(): void;
    /** @internal */
    setPan(panX: number, panY: number): void;
    /** @internal */
    setScale(scale: number): void;
}
