import { Application }  from 'pixi.js';
import type { GraphColorAttributes } from './GraphPluginInstanceOptions.js';
import type { GraphLink } from './GraphLink.js';
import type { GraphNode } from './GraphNode.js';

type GraphColor = 
    | 'circle'
    | 'arrow'
    | 'line'
    | 'lineHighlight'
    | 'fill'
    | 'fillHighlight'
    | 'fillFocused'
    | 'fillTag'
    | 'fillUnresolved'
    | 'fillAttachment';

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