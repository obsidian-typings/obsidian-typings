import { Application } from 'pixi.js';
import type { GraphColor } from './GraphColor.js';
import type { GraphColorAttributes } from './GraphColorAttributes.js';
import type { GraphLink } from './GraphLink.js';
import type { GraphNode } from './GraphNode.js';

/** @public */
export interface GraphRenderer {
    /** @internal */
    colors: Record<GraphColor, GraphColorAttributes>;
    /** @internal */
    fNodeSizeMult: number;
    /** @internal */
    idleFrames: number;
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
    worker: Worker;

    /**
     * Specify that the renderer has changed and needs to be rendered again
     */
    changed(): unknown;
}
