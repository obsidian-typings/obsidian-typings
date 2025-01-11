import { Application }  from 'pixi.js';
import type { GraphColorAttributes } from "./GraphColorAttributes.js";
import type { GraphLink } from './GraphLink.js';
import type { GraphNode } from './GraphNode.js';
import type { GraphColor } from './GraphColor.js';

/** @public */
export interface GraphRenderer {
    /**
     * Specify that the renderer has changed and needs to be rendered again
     */
    changed(): unknown;

    /** @internal */
    colors: Record<GraphColor, GraphColorAttributes>;
    /** @internal */
    px: Application;
    /** @internal */
    links: GraphLink[];
    /** @internal */
    nodes: GraphNode[];
    /** @internal */
    nodeScale: number;
    /** @internal */
    fNodeSizeMult: number;
    /** @internal */
    panX: number;
    /** @internal */
    panY: number;
    /** @internal */
    scale: number;
    /** @internal */
    targetScale: number;
    /** @internal */
    worker: Worker;
    /** @internal */
    interactiveEl: HTMLCanvasElement;
    /** @internal */
    idleFrames: number;
}
